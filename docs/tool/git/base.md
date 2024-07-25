# Git 基本使用

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
