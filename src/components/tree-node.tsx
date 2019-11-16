import React from 'react'
import './index.less'
import { TreeData } from '../typings'

interface Props {
  data: TreeData,
  onCollapse: any,
  onCheck: any
}

class TreeNode extends React.Component<Props> {
  render() {
    let { data: { name, children, key, collapsed, checked }, onCheck } = this.props
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
            onClick={() => this.props.onCollapse(key)}>
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
      // caret = (
      //   <span
      //     className="iconfont iconpreviewright"
      //     onClick={() => this.props.onCollapse(key)}>
      //   </span>
      // )
      caret = <span className="iconfont iconFileloading"></span>
      icon = collapsed ? 'iconfolder1' : 'iconfolder'
    }
    return (
      <div className="tree-node">
        <div className="inner">
          {caret}
          <span className={`iconfont ${icon}`}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onCheck(key)} />
            {name}
          </span>
          {
            (children && children.length > 0 && !collapsed) && (
              <div className="children">
                {
                  children.map((item: TreeData) => (
                    <TreeNode
                      onCollapse={this.props.onCollapse}
                      data={item}
                      onCheck={onCheck}
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
