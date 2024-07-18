# NPM

## Node 包管理工具

### npm镜像

官方镜像 [npmjs.com](https://www.npmjs.com/)
```
https://registry.npmjs.org
```

淘宝镜像 [npmmirror.com](https://npmmirror.com)
```
https://registry.npmmirror.com

```

国内网络，用官方镜像安装慢，可以切换为淘宝镜像
```
npm config set registry https://registry.npmmirror.com
```

npm 相关命令
```
// 查看配置
npm config list

// 查看当前镜像
npm config get registry

// 设置镜像
npm config set registry https://registry.npmjs.org

// 安装Node依赖
npm install || npm i

// 安装某个包(如：vue)依赖 -S(--save)：生产依赖, -D(--save-dev)：开发依赖
npm install (-S|-D) vue

```

相关命令工具
```
cnpm
yarn
pnpm
```