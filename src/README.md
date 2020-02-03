# Tinymce Editor Component

### Themes

### Plugin

| 插件名称       | 备注       |
| -------------- | ---------- |
| advlist        |            |
| anchor         |            |
| contextmenu    |            |
| directionality |            |
| emoticons      |            |
| fullpage       | 全屏       |
| fullscreen     | 全屏       |
| help           |            |
| hr             | 水平横线   |
| image          | 图片       |
| imagetools     | 图片工具   |
| importcss      |            |
| autolink       |            |
| insertdatetime |            |
| legacyoutput   |            |
| link           | 连接       |
| lists          | 列表       |
| media          | 媒体       |
| nonbreaking    |            |
| noneditable    |            |
| pagebreak      |            |
| paste          | 粘贴       |
| preview        | 预览       |
| autoresize     |            |
| print          |            |
| quickbars      |            |
| save           |            |
| searchreplace  |            |
| spellchecker   |            |
| tabfocus       |            |
| table          | 表格       |
| template       |            |
| textcolor      | 文本颜色   |
| textpattern    |            |
| autosave       |            |
| toc            |            |
| visualblocks   |            |
| visualchars    |            |
| wordcount      | 字数统计   |
| bbcode         |            |
| charmap        |            |
| code           | 代码段     |
| codesample     |            |
| colorpicker    | 颜色选择器 |

### Toolbar

| 工具名称       | 说明          |
| -------------- | ------------- |
| undo           | 撤销          |
| redo           | 重做          |
| styleselect    | 格式          |
| fontselect     | 字体          |
| formatselect   | 基块          |
| fontsizeselect | 字号          |
| forecolor      | 文字颜色      |
| backcolor      | 背景色        |
| bold           | 粗体          |
| italic         | 斜体          |
| underline      | 下划线        |
| strikethrough  | 删除线        |
| alignleft      | 左对齐        |
| aligncenter    | 居中对齐      |
| alignright     | 右对齐        |
| alignjustify   | 两端对齐      |
| numlist        | 有序列表      |
| bullist        | 无序列表      |
| outdent        | 减少缩进      |
| indent         | 增加缩进      |
| image          | 插入/编辑图片 |
| media          | 插入/编辑媒体 |
| table          | 表格          |
| preview        | 预览          |
| removeformat   | 清除格式      |
| hr             | 水平分割线    |
| paste          | 粘贴          |
| code           | 源代码        |
| link           | 插入/编辑链接 |
| fullscreen     | 全屏          |

### Props

| 属性            | 说明                   | 类型    | 默认值                  |
| --------------- | ---------------------- | ------- | ----------------------- |
| value           | 富文本编辑内容         | string  | -                       |
| config          | 富文本编辑器自定义配置 | Object  | -                       |
| url             | 图片上传的地址         | string  | -                       |
| accept          | 图片类型               | string  | `image/jpeg, image/png` |
| max-size        | 图片最大               | number  | 2097152                 |
| withCredentials | 图片上传 Http 认证     | boolean | false                   |
