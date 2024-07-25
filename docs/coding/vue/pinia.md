# Pinia


***[Pinia](https://pinia.vuejs.org)***:pineapple:，一个主要为Vue设计的状态管理库。

与vuex相比，***Pinia*** 提供了更好的TypeScript支持，充分利用了Vue 3的新特性，如 Composition Api，更加灵活、方便的提供状态管理。

## 安装
::: code-group
```sh [npm]
npm install pinia
```

```sh [pnpm]
pnpm install pinia
```

```sh [yarn]
yarn add pinia
```
:::

在main.ts中创建一个 ***Pinia*** 实例
```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

```

## 定义 Store
新建 store 文件夹，存放所有的 store，创建一个user.ts。

Store 是用 defineStore() 定义的，它的第一个参数要求是一个独一无二的名字

```js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  // 其他配置...
})

```

#### ***Option Store***

与 Vue 的选项式 API 类似，我们也可以传入一个带有 state、actions 与 getters 属性的 Option 对象

```js
import { defineStore } from 'pinia'

interface UserInfo {
  nickname: string
  avatar: string
}

export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
    }
  },
  getters: {
    getUser: (state: any) => state.user
  },
  actions: {
    setUser(user: any) {
      this.user = user
    }
  }
})

```
可以理解为：
- state 是 store 的数据 (data)
- getters 是 store 的计算属性 (computed)
- actions 则是方法 (methods)

## State

### 访问 State
一般情况下，可以通过 store 实例 访问 state, 直接行读写
```js
const store = useStore()

store.count++

```

### 重置 State
可以调用 store 的 $reset() api 重置
```js
const store = useStore()

store.$reset()

```

### 变更 State
除了 直接改变 store.count++，还可以通过 $patch() 方法更改
```js
store.$patch({
  count: store.count + 2,
  name: 'dell'
})

```

### 监听 State
可以通过 store 的方法 $subscribe() 来监听及变化
```js
store.$subscribe((mutation, state) => {
  console.log('state change', state)
  console.log('mutation', mutation)
}, { detached: true })

```
默认情况下，state subscription 会被绑定到添加它们的组件上 (如果 store 在组件的 setup() 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 { detached: true } 作为第二个参数，以将 state subscription 从当前组件中分离

## Getter

getter相当于 计算属性， 接受一个函数， 函数参数为当前 store 的 state， 也可通过 this 访问

```js
export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
    }
  },
  getters: {
    getUser: (state: any) => state.user
  },
})

```

然后可以通过 store 实例 访问 getter
```vue
<template>
  {{ useUser.user.nickname }}
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/user.ts'
  const useUser = useUserStore()
</script>

```
## Action
Action 相当于组件中的方法，可以使用做一些业务逻辑处理
```js
export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
    }
  },
  getters: {
    getUser: (state: any) => state.user
  },
  actions: {
    setUser(user: any) {
      this.user = user
    }
  }
})

```

### Action 监听

可以通过 store.$onAction() 来监听

```js
// name: action 名称
// store: store 实例，类似 `someStore`
// args: 传递给 action 的参数数组
// after: 在 action 返回或解决后的钩子
// onError: action 抛出或拒绝的钩子
const unsubscribe = someStore.$onAction(({ name, store, args, after, onError }) => {

})

// 此订阅器即便在组件卸载之后仍会被保留
// someStore.$onAction(callback, true)

// 手动删除监听器
unsubscribe()

```

## 数据持久化
***Pinia*** 和 Vuex 一样，刷新后数据会丢失，***Pinia*** 可以通过插件 [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate) 来实现，相关[文档](https://prazdevs.github.io/pinia-plugin-persistedstate)

主要是通过 本地存储 SessionStorage 、LocalStorage 实现

### 安装
::: code-group
```sh [npm]
npm i -S pinia-plugin-persistedstate

```

```sh [pnpm]
pnpm install -S pinia-plugin-persistedstate
```
:::

添加到 ***Pinia*** 实例上
```js
// main.ts

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

```

### 使用
1. 创建 store ，将 persist 设置为 true，将 整个  store 持久化保存
```js
export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
      token: null as string | null
    }
  },
  getters: {
    getUser: (state: any) => state.user,
    getToken: (state: any) => state.token
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(t: any) {
      this.token = t
    }
  },
  persist: true
})

```

2. persist 也可以结接受一个对象
::: details 例如
```js
export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
      token: null as string | null
    }
  },
  getters: {
    getUser: (state: any) => state.user,
    getToken: (state: any) => state.token
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(t: any) {
      this.token = t
    }
  },
  persist: {
    key: '__useUserStore__',
    storage: localStorage,
    paths: ['user', 'token'],
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify
    },
    beforeRestore: (ctx: any) => {
      console.log(`即将恢复：${ctx}`)
    },
    afterRestore: (ctx: any) => {
      console.log(`刚恢复完：${ctx}`)
    }
  }
})

```
:::

* key: 用于引用 storage 中的数据，默认使用store中的Id
* storage: 数据存储位置，默认localStorage，可以该为sessionStorage
* paths: 指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
* serializer: 指定持久化时所使用的序列化方法，以及恢复 Store 时的反序列化方法。默认值：JSON.stringify/JSON.parse
* beforeRestore: hook 将在从 storage 中恢复数据之前触发
* afterRestore: hook 将在从 storage 中恢复数据之后触发
