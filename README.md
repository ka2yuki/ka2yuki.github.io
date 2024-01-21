# Branch Control
production <- dev -> features  

## memo
### リニューアルを想定すると：
**リニューアル前ブランチ**も残しておきたい場合、最初からfeaturesで始める方が良い可能性。  
- dev ← リニューアル後ブランチ ex) Next.js  
- dev ← リニューアル前ブランチ ex) HTML,CSS..  
- dev

もしくは、dev自体をリニューアル前ブランチにして、  
productionから新しくリニューアル後ブランチを生やす。   
ただしこの場合devから生やした機能ブランチはの取り扱いがどうなるか不安..  
- production → renewal  
- dev → before_renewal

そもそもの役割：
- production: テストサバ上でも検証された状態。(自分用は特に使わないのでok)
- dev: 日々の何気ない作業. <- ここに大きなリニューアルが入ると、リニューアル前ブランチと残せなくなる。。**devブランチ自体に層を作ってしまうがhtml,Nextjs,PHP..**。それでｏＫ．devというブランチ名かベースのフレームワーク名にするか迷うが．．とりあえずfeaturesのマージ履歴を追って確認することにしよう。しらんけんど。--

結論：
リニューアル。フレームワーク導入などもfeatureブランチ。

フレームワークでメイン作業ブランチ(feature)を作成する
- pro <- dev -> (features)New FrameWork✨ 
- pro <- dev -> (features)Nextjs  
- pro <- dev -> (features)html,css..

# Reading List
- [Git-flow | Qiita.com](https://qiita.com/KosukeSone/items/514dd24828b485c69a05#git-flow%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%A8%E5%90%84%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%81%AE%E5%BD%B9%E5%89%B2)
- Blog「[A successful Git branching model](https://www.google.com/search?q=A+successful+Git+branching+model&rlz=1C1TKQJ_jaJP1051JP1051&oq=A+successful+Git+branching+model&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQABgeMgYIAhAAGB4yBggDEAAYHjIGCAQQABgeMgYIBRBFGEAyBggGEEUYPKgCALACAA&sourceid=chrome&ie=UTF-8)」
- トランクベース開発のおおまかな理解
  - [トランクベースのワークフローのリンク](https://www.atlassian.com/ja/git/tutorials/comparing-workflows/gitflow-workflow)
