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
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default Tree
