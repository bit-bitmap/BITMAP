# BITMAP
[![CodeFactor](https://www.codefactor.io/repository/github/bit-bitmap/bitmap/badge)](https://www.codefactor.io/repository/github/bit-bitmap/bitmap)
[![State-of-the-art Shitcode](https://img.shields.io/static/v1?label=State-of-the-art&message=Shitcode&color=7B5804)](https://github.com/trekhleb/state-of-the-art-shitcode)

为北理工学生服务的信息分享平台，以微信小程序作为载体。

## 预览
使用微信开发者工具打开`miniprogram`目录，即可在模拟器中体验此小程序。

## 项目结构
```
BITMAP
├─ cloudfunctions           // 云函数
│  └─ quickstartFunctions   // 初始云函数
├─ miniprogram              // 小程序源码目录
│  ├─ components            // 作为组件引入的页面
│  ├─ images                // 小程序中使用的图片
│  ├─ pages                 // 小程序各级页面
│  ├─ app.js                // 小程序主逻辑
│  ├─ app.json              // 小程序公共配置
│  ├─ app.wxss              // 小程序公共样式表
│  └─ sitemap.json          // 这是什么呢？
├─ .gitattributes           // Git 配置文件
├─ .gitignore               // Git 忽略文件
├─ project.config.json      // 小程序项目配置文件
└─ README.md                // 项目描述文件
```
