# Taro

Taro 小程序中使用 Axios 遇到的问题

## 1、AxiosError: There is no suitable adapter to dispatch the request 错误。

原因：因为 axios 默认的 HTTP 请求适配器是基于浏览器环境的 XMLHttpRequest 或 Node.js 的 http 模块，而小程序平台没有这些环境，导致无法直接使用。

### 解决方案

方法 1: 使用 Taro 内置的 Taro.request 替代 axios

Taro 已经封装了小程序的网络请求 API（wx.request），建议直接使用 Taro.request 代替 axios，这是最兼容的方式。

```ts
import Taro from '@tarojs/taro';

// 使用 Taro.request 发送请求
const request = async () => {
  try {
    const res = await Taro.request({
      url: 'https://api.example.com/data',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

request();
```

方法 2: 为 axios 配置小程序适配器（不推荐）

如果坚持使用 axios，需要安装适配小程序的 axios 适配器（如 [@taro-platform/axios-taro-adapter](https://github.com/bigmeow/taro-platform/tree/master/packages/axios-taro-adapter)），但这种方式可能存在兼容性问题。

1.安装适配器：

```ts
npm i @taro-platform/axios-taro-adapter
```

2.配置适配器：

```ts
import axios, { AxiosInstance } from 'axios'
import MpAdapter, { defaultTransformRequest } from '@taro-platform/axios-taro-adapter'

axios.create({
  baseURL: 'http://api.xxx',
  timeout: 5 * 60000, // 请求超时时间
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 因为 axios 默认的 HTTP 请求适配器是基于浏览器环境的 XMLHttpRequest 或 Node.js 的 http 模块，而小程序平台没有这些环境，导致无法直接使用
  // 使用axios 小程序环境适配器
  adapter: MpAdapter,
  transformRequest: defaultTransformRequest
})

```

方法 3: 手动实现 axios 适配器

如果不想依赖第三方库，可以自定义适配器将 axios 的请求转发到 Taro.request：

```ts
import axios from 'axios';
import Taro from '@tarojs/taro';

// 自定义适配器
const taroAdapter = (config) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: config.url,
      method: config.method?.toUpperCase() as any,
      data: config.data,
      header: config.headers,
      success: (res) => resolve({ data: res.data, status: res.statusCode, headers: res.header, config }),
      fail: (error) => reject(error)
    });
  });
};

// 创建 axios 实例并指定适配器
const instance = axios.create({
  adapter: taroAdapter
});

// 发送请求
instance.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```
