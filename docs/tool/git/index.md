# Git 本地配置

### 本地用户名，邮箱配置
```
git config --global user.name "xxx"
git config --global user.email "xxx@xxx.com"
```

### 查看是否有 SSH Key
```
cd ~/.ssh
```
### 生成秘钥
```
ssh-keygen -t rsa -C "xxx@xxx.com"
```
生成后会得到 id_rsa 和 id_rsa.pub 两个文件

### 添加 SSH 到远程git
把 id_rsa.pub 内容配置到远程SSH keys

### 测试是否配置成功
```
ssh -T git@github.com
```
