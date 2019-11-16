import React from 'react'
import './index.less'
import { TreeData } from '../typings'
import TreeNode from './tree-node'

// 接口类型，可以用来装饰，约束，组件的属性
interface Props {
  data: TreeData
}

interface State {
  data: TreeData
}

// 属性名任意
interface KeyNodeMap {
  [key: string]: TreeData
}

// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
class Tree extends React.Component<Props, State> {
  keyNodeMap: KeyNodeMap
  constructor(props: Props) {
    super(props)
    this.state = { data: this.props.data }
    this.buildKeyMap() // 创建keyMap
  }
  // 把节点的key和节点本身格式化
  buildKeyMap = (): void => {
    let data = this.state.data
    this.keyNodeMap = {}
    this.keyNodeMap[data.key] = data
    if (data.children && data.children.length > 0) {
      this.walk(data.children, data)
    }
    // this.setState({data: this.state.data})
  }
  walk = (children: TreeData[], parent: TreeData): void => {
    children.forEach((item: TreeData) => {
      this.keyNodeMap[item.key] = item
      item.parent = parent
      if (item.children && item.children.length > 0) {
        this.walk(item.children, item)
      }
    })
  }
  onCollapse = (key: string): void => {
    let data = this.keyNodeMap[key]
    if (data) {
      data.collapsed = !data.collapsed
      data.children = data.children || []
      this.setState({ data: this.state.data })
      // this.buildKeyMap()
    }
  }
  onCheck = (key: string): void => {
    let data = this.keyNodeMap[key]
    if (data) {
      data.checked = !data.checked
      // 父级选中，子级也要选中
      if (data.checked) {
        this.checkChildren(data.children, true)
        // 子节点选中父节点也要选中
        this.checkParent(data.parent)
      } else {
        // 取消选中
        this.checkChildren(data.children, false)
        this.checkParent(data.parent)
      }
    }
    this.setState({data: this.state.data})
  }
  checkParent = (parent: TreeData): void => {
    while (parent) {
      parent.checked = parent.children.every((item: TreeData) => item.checked)
      parent = parent.parent
    }
  }
  checkChildren = (children: TreeData[] = [], checked: boolean): void => {
    children.forEach((item: TreeData) => {
      item.checked = checked
      this.checkChildren(item.children, checked)
    })
  }
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode
            data={this.props.data}
            onCollapse={this.onCollapse}
            onCheck={this.onCheck} />
        </div>
      </div>
    );
  }
}

export default Tree
