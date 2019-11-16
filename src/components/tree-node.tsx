import React from 'react'
import './index.less'
import { TreeData } from '../typings'

interface Props {
  data: TreeData,
  onCollapse: any
}

class TreeNode extends React.Component<Props> {
  render() {
    let { data: { name, children, key, collapsed } } = this.props
    // 箭头
    let caret = null
    // 图标
    let icon = null
    if (children) {
      if (children.length > 0) {
        // 是目录
        caret = (
          <span
            className={`iconfont ${collapsed ? 'iconpreviewright' : 'icondownarrow'}`}
            onClick={this.props.onCollapse(key)}>
          </span>
        )
        icon = collapsed ? 'iconfolder1' : 'iconfolder'
      } else {
        // 是文件，文件不能展开，没有箭头
        caret = <span className="empty"></span>
        icon = 'iconfile'
      }
    } else {
      // 需要远程加载
      caret = (
        <span
          className="iconfont iconpreviewright"
          onClick={this.props.onCollapse(key)}>
        </span>
      )
      icon = collapsed ? 'iconfolder1' : 'iconfolder'
    }
    return (
      <div className="tree-node">
        <div className="inner">
          {caret}
          <span className={`iconfont ${icon}`}>
            {name}
          </span>
          {
            (children && children.length > 0) && (
              <div className="children">
                {
                  children.map((item: TreeData) => (
                    <TreeNode
                      onCollapse={this.props.onCollapse}
                      data={item}
                      key={item.key} />
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
