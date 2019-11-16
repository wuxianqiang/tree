export interface TreeData {
  name: string,
  key: string,
  type: string,
  collapsed: boolean,
  children?: TreeData[]
}

// ?:可选属性
// 类型声明文件
// interface：用来描述对象的形状
// TreeData[] 表示数组，数组的每一项是结构是TreeData
