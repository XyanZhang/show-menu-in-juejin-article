# show-menu-in-juejin-article

a plugin for JueJin to show menu in article

Chrome 插件开发，几大模块以及对应功能

## Content Script

- [x] 通过 `chrome.tabs.executeScript` 注入页面
- [x] 通过 `chrome.tabs.sendMessage` 与 Background 通信
- [x] 通过 `chrome.runtime.onMessage.addListener` 监听 Background 发送的消息
- [x] 通过 `chrome.runtime.sendMessage` 与 Popup 通信
- [x] 通过 `chrome.runtime.onMessage.addListener` 监听 Popup 发送的消息

## Background

- [x] 监听 `chrome.tabs.onUpdated` 事件，判断当前页面是否需要注入
- [x] 监听 `chrome.tabs.onActivated` 事件，判断当前页面是否需要注入
- [x] 监听 `chrome.runtime.onMessage.addListener` 事件，接收 Content Script 发送的消息
- [x] 使用 `chrome.storage` 存储数据

## Popup

- [x] 监听 `chrome.runtime.onMessage.addListener` 事件，接收 Background 发送的消息
- [x] 使用 `chrome.storage` 存储数据
- [x] 使用 `chrome.tabs.sendMessage` 与 Content Script 通信
- [x] 使用 `chrome.tabs.query` 获取当前页面的 TabId

## Options

- [x] 使用 `chrome.storage` 存储数据
- [x] 使用 `chrome.runtime.sendMessage` 与 Background 通信

## Manifest

- [x] `content_scripts` 注入页面
- [x] `background` 注册事件
- [x] `options_page` 配置页面
- [x] `options_ui` 配置页面
- [x] `default_popup` 弹出页面
- [x] `permissions` 权限
- [x] `web_accessible_resources` 允许访问的资源
- [x] `storage` 存储数据
- [x] `commands` 快捷键

DevTools Page 部分可以访问 devtools api，可以向当前 window 注入 JS 执行。

## Reference

- [Chrome Extensions](https://developer.chrome.com/extensions)

vue react devTools 原理：

- Content Script 部分可以操作 DOM，可以监听 DOM Event。
- Backgroud 部分可以访问 extension api，可以和 Content Script 还有 DevTools Page 通信。
- DevTools Page 部分可以访问 devtools api，可以向当前 window 注入 JS 执行。

通信过程：

- DevTools Page 是可以在页面 eval JS 的，那就可以注入 backend 的代码
- backend 的代码可以拿到 Vue 组件的信息，通过 window message 的方式传递给 Background。
- Background 可以和 DevTools Page 通信，从而实现消息转发
- DevTools Page 根据拿到的数据，渲染组件的信息，实现交互功能。
