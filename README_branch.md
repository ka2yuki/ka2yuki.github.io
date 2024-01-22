# Branch Control
1. production <- dev -> features(New FrameWork✨)  
2. production <- dev -> features(Nextjs)  
3. production <- dev -> features(html,css..)  

## memo
### リニューアルを想定すると：
**リニューアル前ブランチ**も残しておきたい場合、最初からfeaturesで始めた方が良いのか。。  
- dev ← リニューアル後ブランチ ex) Next.js  
- dev ← リニューアル前ブランチ ex) HTML,CSS..  
- dev

もしくは、dev自体をリニューアル前ブランチにして、  
productionから新しくリニューアル後ブランチを生やす。   
ただ、この場合devから生やした機能ブランチの取り扱いが不安..  
- production → renewal  
- dev → before_renewal

ブランチの役割(現在)：
- production: テストサバ上でも検証された状態。(自分用は特に使わないのでok)
- dev: 日々の作業.
> ここにリニューアルが入ると「リニューアル前ブランチ」と残せなくなる。。**言語やフレームワークの変更は、devブランチ自体に層ができてしまう。html,Nextjs,PHP..**。devブランチか、フレームワーク名にするか．．
  
- pro <- dev -> (features)New FrameWork✨
- pro <- dev -> (features)Nextjs
- pro <- dev -> (features)html,css..


解決案
> devブランチを、Nextjsbase-dev, Railsbase-dev, Laravelbase-devなどとして、そこから枝葉を生やす方法。

1. suffix
  - pro -> NewFrameWork_dev✨
  - pro -------------> Nextjsbase_dev
  - pro ------------------> Htmlcssbase_dev
2. prefix
  - pro -> dev_NewFrameWork✨
  - pro -------------> dev_Nextjsbase
  - pro ------------------> dev_Htmlcssbase


# Reading List
- [Git-flow | Qiita.com](https://qiita.com/KosukeSone/items/514dd24828b485c69a05#git-flow%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%A8%E5%90%84%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%81%AE%E5%BD%B9%E5%89%B2)
- Blog「[A successful Git branching model](https://www.google.com/search?q=A+successful+Git+branching+model&rlz=1C1TKQJ_jaJP1051JP1051&oq=A+successful+Git+branching+model&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQABgeMgYIAhAAGB4yBggDEAAYHjIGCAQQABgeMgYIBRBFGEAyBggGEEUYPKgCALACAA&sourceid=chrome&ie=UTF-8)」
- トランクベース開発のおおまかな理解
  - [トランクベースのワークフローのリンク](https://www.atlassian.com/ja/git/tutorials/comparing-workflows/gitflow-workflow)
