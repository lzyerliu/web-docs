# Git

## 1、本地配置基本用法

### 查看是否有 SSH Key
```sh
cd ~/.ssh
```
### 生成独立 SSH 秘钥
```sh
# rsa 算法
# -t rsa: 指定秘钥算法类型；-C: 注释内容
ssh-keygen -t rsa -C "<注释内容一般为邮箱xxx@xxx.com>"
# -b 2048：秘钥位数 更高安全可指定4096；-f ~/.ssh/id_rsa_test: 指定路径与名称
ssh-keygen -t rsa -b 4096 -C "xxx@xxx.com" -f ~/.ssh/id_rsa_test
# 保存路径为 ~/.ssh/id_rsa_test


# ED25519 算法
ssh-keygen -t ed25519 -C "xxx" -f ~/.ssh/my_custom_key
# 保存路径为 ~/.ssh/my_custom_key

```
生成后会得到 id_rsa 和 id_rsa.pub 两个文件

### 添加 SSH 到远程git
把 id_rsa.pub 内容配置到远程SSH keys

### 测试是否配置成功
```sh
ssh -T git@github.com
```


## 2、多账号、多源配置

### 本地生成多秘钥（参考上面秘钥生成）

```sh
# 以rsa为例  生成id_rsa_111 id_rsa_222 id_rsa_333 三个秘钥
ssh-keygen -t rsa -C "rsa111" -f ~/.ssh/id_rsa_111
ssh-keygen -t rsa -C "rsa222" -f ~/.ssh/id_rsa_222
ssh-keygen -t rsa -C "rsa333" -f ~/.ssh/id_rsa_333
```

### 修改 SSH 配置文件

编辑本地config文件  vim ~/.ssh/config

```sh
# Host 定义主机的别名（用于 ssh 命令或 Git 的远程地址）; 如：Host gitlab-work
# HostName 指定实际的主机名或 IP 地址; 如：HostName gitlab.my-work.com
# PreferredAuthentications 指定客户端尝试连接服务器时首选的认证方法; 如：PreferredAuthentications publickey,password,keyboard-interactive
# IdentityFile 指定私钥文件路径（优先级高于默认的 ~/.ssh/id_rsa）; 如：IdentityFile ~/.ssh/id_rsa_111
# IdentitiesOnly 强制仅使用 IdentityFile 指定的密钥（忽略 SSH 代理中的其他密钥）; 如：IdentitiesOnly yes

# 示例1
HostName gitlab.my-work.com
  PreferredAuthentications publickey # 只使用公钥认证
  IdentityFile ~/.ssh/id_rsa_111
  IdentitiesOnly yes

# 示例2
HostName codeup.aliyun.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_222
  IdentitiesOnly yes

# 示例3
Host codeup-user-my # 定义别名， 实际连接 codeup.aliyun.com  如仓库真实地址为：git@codeup.aliyun.com:xxxx/xxx/xxx.git 就设置别名为 git remote set-url origin git@codeup-user-my:xxxx/xxx/xxx.git
  HostName codeup.aliyun.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_333
  IdentitiesOnly yes

```

### 测试是否配置成功
```sh
ssh -T git@codeup-user-my  # 应返回 对应的 欢迎信息

ssh -T git@codeup.aliyun.com  # 应返回 对应的 欢迎信息
```
