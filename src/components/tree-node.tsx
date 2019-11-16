import React from 'react'
import './index.less'
import { TreeData } from '../typings'

interface Props {
  data: TreeData
}

class TreeNode extends React.Component<Props> {
  render() {
    let { data: { name, children } } = this.props
    return (
      <div className="tree-node">
        <div className="inner">
          <span className="content">
            {name}
          </span>
          {
            (children && children.length > 0) && (
              <div className="children">
                {
                  children.map((item: TreeData) => (
                    <TreeNode data={item} key={item.key} />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default TreeNode
