# 求人エントリーサイト

## フロントエンド
- [create-react-app](https://create-react-app.dev/)：環境構築。
- ライブラリ：
  - ~~[reactstrap](https://reactstrap.github.io/)~~
    - 使いやすいが。ボタンEffectなどが下記の方が魅力的だった為、今回は未使用。
  - [Material-UI](https://material-ui.com/getting-started/installation/)
    - デフォ部品。
  - [Bootstrap(npm)](https://www.npmjs.com/package/bootstrap)
    - 簡易的に Class 割り当て。
- Style記法：
  CSS in JS. `makeStyles()`: Material-UI

## バックエンド
- Firebase
  - ホスティング：Hosting
  - DB：FireStore
  - ~~Functions~~

## その他
- ソースコード/issue管理：GitHub

## ルーティング 
- エントリーページ：`/`
- 管理画面　　　　：`/dashboard`
- ログインページ　：`/login`
  - Email, Password.
---
## check this application.
```sh
npm i
npm run start
```
Hosting URL: https://applyforajob-4b9d9.web.app
