import React from 'react'
import './index.less'
import { TreeData } from '../typings'
import TreeNode from './tree-node'

// 接口类型，可以用来装饰，约束，组件的属性
interface Props {
  data: TreeData
}

// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
class Tree extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
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
