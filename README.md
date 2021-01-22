
# cloneについてから実行について
以下手順にてプロジェクトをcloneし、実行してください。
```
 cd "カレントフォルダ"
 git clone https://github.com/yasuhiro-nogiwa/holidayPlan.git
 npm install
 npm install --save react-chartjs-2 chart.js
 npm start
```

# Viewの編集サンプル
以下の追加を行っている。
```
・node_modules "npm install"が必要
・chart "npm install --save react-chartjs-2 chart.js"が必要
・semantic-ui "index.htmlにURL記載済み"
・cssの導入 
```

# ビルド及びローカル環境における確認実行手順
```
//ビルド
npm run build
// プロジェクト内のbuildフォルダにビルド物を作成

//serverのインストール(必要があれば)
npm npm install serve -g

//ローカルサーバの立ち上げ
serve -s ./build

//サーバー起動時のlocalhostにアクセス
//"http://localhost:5000" <- デフォルト
```
