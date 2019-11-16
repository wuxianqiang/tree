import React from 'react'
import './index.less'
import { TreeData } from '../typings'

// 接口类型，可以用来装饰，约束，组件的属性
interface Props {
  data: TreeData
}

class Tree extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <div className="tree">Tree</div>
    );
  }
}

export default Tree
