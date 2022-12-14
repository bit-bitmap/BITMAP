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
│  ├─ ChangeCondition       // 更新数据云函数
│  └─ quickstartFunctions   // 初始云函数
├─ miniprogram              // 小程序源码目录
│  ├─ images                // 小程序中使用的图片
│  ├─ pages                 // 小程序各级页面
│  ├─ utils                 // 小程序公共函数
│  ├─ app.js                // 小程序主逻辑
│  ├─ app.json              // 小程序公共配置
│  ├─ app.wxss              // 小程序公共样式表
│  └─ sitemap.json          // 微信索引收录配置
├─ .gitattributes           // Git 配置文件
├─ .gitignore               // Git 忽略文件
├─ project.config.json      // 小程序项目配置文件
└─ README.md                // 项目描述文件
```

## 依赖
[`miniprogram/pages/weui.wxss`](https://github.com/bit-bitmap/BITMAP/blob/main/miniprogram/pages/weui.wxss)为WeUI小程序样式库，引用自[Tencent/weui-wxss](https://github.com/Tencent/weui-wxss/)。
