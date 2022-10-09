# Forum

基于 React 的浙江大学 CC98 论坛网站前端项目

CC98 Durian 开发组

_[Auser](https://github.com/sgjsakura), [Madridista](https://github.com/Tsukiko15), [董松松松](https://github.com/AsukaSong), [明一 gg](https://github.com/mingyigg), [adddna](https://github.com/adddna), [Dearkano](https://github.com/Dearkano), SummerD, [Deturium](https://github.com/Deturium)_

## How To Run

```
git clone https://github.com/ZJU-CC98/Forum.git
cd Forum/CC98.Forum
npm install
npm run dev
```

### Notes

- 请使用 `node v17` 之前的版本（不包括 17，推荐用 16）进行构建，否则某些依赖会报 `digital envelope routines` 错误，相关问题和解决办法可参见这个[提问](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)。相比于临时添加环境变量，更推荐使用 [nvm](https://github.com/nvm-sh/nvm) 做 node 的版本管理和切换。
- `npm install` 和 `yarn add` 的效果不一样，用 `yarn` 安装所有依赖后 `build` 会报错，`npm` 则不会，待进一步检查。
- 如果因为网络波动和连接性问题，出现包安装过程时间过长导致出错的现象，可以在 `./CC98.Forum` 目录下添加如下的 `.npmrc` 文件：

  ```ini
  timout=9999999                            # 增加超时时限
  registry=https://registry.npmmirror.com/  # 将 npm 源更换为镜像源
  ```

## File Intro

### ./wwwroot

- /static 网站静态文件
  - /content css 文件
  - /images 网站的表情包，头图等图片文件
  - /scripts 网站的所有脚本
  - /boardInfo.json 版面信息表
  - /98icon.ico 网站标识
  - /config.json 项目配置
  - /index.html 网站文件
  - /portrait.json 头饰配置

### ./Actions

react-redux 的 action

### ./AsyncActions

react-redux 的异步 action（用户中心）

### ./Components

- /Board 版面
  - /Board.tsx 版面内容
  - /BoardList.tsx 版面列表
- /Focus 关注
- /Message 私信
- /Search 搜索
- /SiteManage 全站管理
- /Topic 帖子
  - /Topic.tsx 帖子组件
  - /Topic-Award.tsx 风评/奖惩展示组件
  - /Topic-AwardInfo.tsx 单个风评/奖惩展示组件
  - /Topic-Category.tsx 导航条组件
  - /Topic-Hot-Monthly 每月热门话题
  - /Topic-Hot-Weekly 每周热门话题
  - /Topic-Judge 风评组件
  - /Topic-New 新帖
  - /Topic-PostManagement 楼层管理
  - /Topic-Replier 用户信息组件
  - /Topic-ReplierSignature 用户签名档/楼层按钮组件
  - /Topic-Reply 楼层组件
  - /Topic-ReplyContent 帖子内容
  - /Topic-SendTopic 回帖
  - /Topic-TopicInfo 主题信息
  - /Topic-TopicManagement 主题管理
  - /Topic-Trace 追踪
- /UbbEditor Ubb 编辑器
- /UserCenter 用户中心
- /App.tsx 路由中心
- /Category.tsx 导航条
- /Constant.tsx 全局变量
- /DocumentTitle.tsx 网页标题
- /Edit.tsx 发表/编辑主题
- /ErrorControl.tsx 错误页面管理
- /FindIP.tsx 查询 IP
- /Footer.tsx 网站底部
- /Header.tsx 网站头部
- /LogOn.tsx 登录组件
- /MainPage.tsx 网站主页
- /NoticeMessage.tsx 消息提醒
- /Pager.tsx 翻页器
- /RouteComponent.tsx 路由组件基类
- /SignIn.tsx 签到
- /Status.tsx 报错页面
- /UbbContainer.tsx Ubb 解析器
- /UbbEditor.tsx Ubb 编辑器
- /IndexedDB Indexed 数据库 用户信息缓存
- /Match Redux 组件
- /Props React 组件的 Props 类
- /Reducers Redux 组件
- /States React 组件的 State 类
- /Themes 网站主题
- /Ubb Ubb 解析引擎
- /Utility 函数集
- /vscodeConfig vscode 开发配置
- /ActionTypes.tsx Redux 的 Action 类型
- /Main.tsx 程序入口
- /adddna.scss zza 的样式表
- /package.json 项目依赖
- /Site.scss 网站的主样式表
- /Store.tsx Redux 的 store 组件
- /UbbEditor.scss Ubb 编辑器样式表
- /UserCenter.scss 用户中心样式表
- /Utility.tsx 函数集
- /webpack.config.debug.ts debug 模式使用的 webpack 配置
- /webpack.config.release.ts release 模式使用的 webpack 配置
