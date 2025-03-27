# Git 基本使用

### 本地用户名，邮箱配置
```sh
# 配置全局 用户名邮箱
git config --global user.name "xxx"
git config --global user.email "xxx@xxx.com"

# 配置 当前仓库 用户名邮箱
git config --local user.name "xxx"
git config --local user.email "xxx@xxx.com"
```

```sh
git init --initial-branch=main # 初始化指定分支
```

### 一次简单的提交
```sh
git add .
git commit -m "变化备注"
git push
```

### 本地开发时，想临时切分支改个问题
```sh
# 暂缓当前分支修改
git stash

# 切换目标分支
git checkout <branch>

# 改完问题后 切回原分支
git checkout <original branch>

# 恢复原分支暂缓修改
git stash pop
```
