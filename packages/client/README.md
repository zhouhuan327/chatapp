This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ChatApp

前端技术栈:`React Recoil StyledComponent Typescript`

运行 demo

`yarn dev`

组件文档

`yarn storybook`

## 迁移 vite 问题记录

- vite 基于 esmodule，所以不允许相对路径。

在 vite.config.js 中配置 alias，将之前所有的相对路径批量替换为绝对路径

- 使用 vite 构建后不支持之前导入 svg 的写法

`import {ReactComponent as xxSVG} from 'xxx.svg'`

这个写法是由 cra 内置的 webpack 插件实现的。在 vite 官网找到了类似的插件`vite-plugin-svgr`

- 使用的其他库如果依赖了 node 的 api，如（process，Buffer）会因为没有定义导致报错

使用 rollup 的一些插件（rollup-plugin-node-builtins，rollup-plugin-node-globals）都没有解决这个问题。

但是直接通过在 vite 配置中使用 define 声明 Buffer
和 process 为空对象它竟然就可以了。 非常的 Amazing :laughing:

之后再研究研究
