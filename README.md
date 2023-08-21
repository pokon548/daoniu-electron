# 道牛

一个基于 Electron 编写的[知犀思维导图](https://www.zhixi.com/)非官方 PC 客户端，为 Linux 用户量身打造。

因为官方暂时没有出 Linux 客户端的计划，而单纯的网页版在交互上不是那么好用，所以特别制作了这个客户端，使得 Linux 用户也能获得与官版相似的体验。

![showcase.png](https://s2.loli.net/2023/08/22/AY8vlmq1IM6zWV5.png)

## ⚠️ 声明
- 该客户端与知犀平台官方无任何关联，您不应在使用本客户端的同时向官方渠道反馈任何技术问题。请直接在本项目 Issue 或 Discussion 区讨论；
- 该客户端仅为方便个人在 Linux 平台学习用途开发。无盈利，无打赏 / 捐助，非商业用途，且完全开放源代码；
- 开发者不对非 Linux 平台提供任何支持；
- 使用该客户端，即表示您**知情**并**同意**自行承担使用本非官方客户端所造成的**一切（可能）直接或间接损失**，且作者对此**不承担任何责任**。

## ✅ 支持功能
- 整合式标签浏览（和官方 PC 端一样的导航体验）
- 个人首页
- 思维导图查看及编辑
- 根据系统风格自动设置暗黑或明亮风格

## 🛠️ 如何编译
推荐使用以下编译套装：

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 安装依赖
在克隆完本项目的源代码后，执行以下命令安装依赖：

```bash
$ yarn
```

### 运行开发版本

```bash
$ yarn dev
```

### 构建
```bash
# For Linux
$ yarn build:linux
```
