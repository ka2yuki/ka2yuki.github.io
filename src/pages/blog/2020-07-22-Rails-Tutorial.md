---
templateKey: blog-post
title: Rails Tutorial６ Log
date: 2020-07-26T21:59:35.844Z
description: Raails Tutorial var6を購入し、完走までの記録。
featuredpost: false
featuredimage: /img/rails.png
tags:
  - Rails
---

# 進行

- Cloud9 使わない.

# 深めたい

- ログイン機能
- ユーザー管理の基本 DB 設計
- CRAD
- Rails6 の機能

# Rails6 のリリース 機能

- メールのルーティング
- リッチテキスト機能
- パラレルテスト機能
- マルチプルデータベースのサポート
  といった数々の新機能が導入されています

# Memo

> あまりにもお手軽にコードを生成できる (訳注: 原文の「<u>**quicker, easier, more seductive**</u>」は、スターウォーズ・エピソード V のヨーダの台詞の引用) <u>**scaffold の機能**</u>を使う誘惑にかられることが何度もありました
>
> **Ruby の世界**では、**インデント**に**2 つ** の**スペース**を使うのがほぼ常識になっている

## Commans: ~立ち上げまで

```sh
# Rails をインストールする
# Ruby ドキュメントをインストールしないよう.gemrc ファイルを設定する
echo "gem: --no-document" >> ~/.gemrc
# バージョンを指定して Rails をインストールする場合
gem install rails -v 6.0.3
# Yarn: JavaScriptソフトウェアの依存関係を管理する. npmで.
npm install -g yarn
bundle install
rails server #=> rails s
```

> システムによっては、rails server コマンドを実行する前にローカル Web サーバーへの<u>**接続を許可**する必要が生じる</u>ことがあります。
> `config/environments/development`

## Heroku 用

```rb
group :development, :test do
  gem 'sqlite3', '1.4.1'
  gem 'byebug',  '11.0.1', platforms: [:mri, :mingw, :x64_mingw]
end
group :production do
  gem 'pg', '1.1.4'
end
```

```sh
bundle install --without production
```

### Heroku CLI DL

```sh
curl https://cli-assets.heroku.com/install.sh | sh
heroku --version
heroku login # --interactive
heroku create
git push heroku master
# Re-Name
heroku rename rails-tutorial-hello
```

[Heroku](https://dashboard.heroku.com/apps)

---

# モデル(DB)設計

### ユーザー

![user_model](/img/demo_user_model.png "user_model")

- integer 型の ID 番号：重複のない一意のキーとなる
- string 型の名前：一般公開される
- string 型のメールアドレス

  - メールアドレスはユーザー名としても使われます。

### マイクロポスト

![micropost_model](/img/micropost_model.png "micropost_model")

- id: ポスト ID
- content: テキスト内容
- user_id: マイクロポストの投稿者を記録する. user と紐付け.

---

# Scaffold で User 作成: 0 -> 1

```sh
rails generate scaffold User name:string email:string
rails db:migrate
# rails g scaffold -h
```

### MVC の挙動

![mvc_detailed](/img/mvc_detailed.png "mvc_detailed")

## コード参照

index.html.erb

```index.html
  <tbody>
    <% @users.each do |user| %>
      <tr>
        <td><%= user.name %></td>
        <td><%= user.email %></td>
        <td><%= link_to 'Show', user %></td>
        <td><%= link_to 'Edit', edit_user_path(user) %></td>
        <td><%= link_to 'Destroy', user, method: :delete,
                         data: { confirm: 'Are you sure?' } %></td>
      </tr>
    <% end %>
  </tbody>
<%= link_to 'New User', new_user_path %>
```

- **@users** は (User モデルクラスを controller.rb で生成された) <u>_Ruby インスタンス変数_</u>。

  - <u>_@user <- User-ClassModel_</u> as for instance value.

- サーバーから動的に返される
- `<% ～ %>`または`<%= ～ %>`テンプレートの中に <u>_Ruby コード記述_</u>
- **[link_to 📖](https://api.rubyonrails.org/v5.2.3/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to)** は <u>_ActionView::Helpers::UrlHelper の関数_</u> in Rails.

  - 引数：`link_to(名前, オプション(列挙できる), html_options = nil, &block)`\
    要約すると`link_to(*args, &block)`[link](https://www.javadrive.jp/rails/template/index8.html)

    - `&block`: a タグで囲める. ブロックにする的な感じだと思う.

  - <u>**\#アンカー・?クエリ文字列**</u>も生成できる。

    - `<a href="/users?foo=bar"> hoge </a>`

  - Also you can set any link attributes such as <u>**_target, rel, type_**</u>

```
# アンカー => <a href="/profiles/1#wall">Comment wall</a>
link_to "Comment wall", profile_path(@profile, anchor: "wall")

# クエリ文字列 => <a href="/searches?query=ruby+on+rails">Ruby on Rails search</a>
link_to "Ruby on Rails search", controller: "searches", query: "ruby on rails"

# クエリ文字列 => <a href="/searches?foo=bar&amp;baz=quux">Nonsense search</a>
link_to "Nonsense search", searches_path(foo: "bar", baz: "quux")

# target, rel, type => <a href="http://www.rubyonrails.org/" target="_blank" rel="nofollow">External link</a>
link_to "External link", "http://www.rubyonrails.org/", target: "_blank", rel: "nofollow"
```

- link_to<続き>

  - `edit_user_path(user)`

    - **link_to** の引数。<u>ルーティング名でリンク先指定</u>. （*ルーティング名に「**\_path**」*を付けたもの。）
    - ルーティング名は`edit_user`。

      > routers.rb では, **resources :users**。確認方法：`$ rails routes`. \[prefix]参照.

# Scaffold-User の欠点

Scaffold 作成の Users リソースは、手っ取り早く良い。
しかし、次のような<u>**問題点**</u>を抱える。

1. **データの検証がない。**Validation: このままでは、ユーザー名が空欄や、でたらめなメールアドレスを入力したりしても通る。
2. **ユーザー認証がない。**Authentication: ログイン、ログアウトが行われていないので、誰でも無制限に操作できてしまいます。
3. **テストが満たしていない。**Test: scaffold で生成したコードにはごく簡単なテストが一応含まれているが、scaffold のテストコードは、**データ検証**や**ユーザー認証**、**その他の必要な要求**を満たしていません。

---

# Scaffold でマイクロポスト作成

```
$ rails g scaffold Micropost content:text user_id:integer
$ rails db:migrate
```

rails generate/g scaffold で自動生成される Routes.

| HTTP リクエスト | URL                | アクション | 用途                             |
| --------------- | ------------------ | ---------- | -------------------------------- |
| GET             | /microposts        | index      | 全てのマイクロポストの表示ページ |
| GET             | /microposts/1      | show       | 個別マイクロポストの表示ページ   |
| GET             | /microposts/new    | new        | 新規作成するページ               |
| POST            | /microposts        | create     | 新規作成する<u>_アクション_</u>  |
| GET             | /microposts/1/edit | edit       | 編集するページ                   |
| PATCH           | /microposts/1      | update     | 更新する<u>_アクション_</u>      |
| DELETE          | /microposts/1      | destroy    | 削除する<u>_アクション_</u>      |

- Model（\*ActiveRecord)の振る舞いを見たい場合。(データ変更する事なく）

[rails console](https://railsguides.jp/command_line.html#rails-console)

- 直接 DB を扱う。（\* _ActiveRecord_ を使わず直接 SQL 文を扱いたい場合。）
- rails c --sandbox
  `--sandbox 付けるとデータに影響を与えない。`

[rails db](https://railsguides.jp/command_line.html#rails-dbconsole)

```
rails db
```

> \*ActiveRecord: ORM (オブジェクトリレーショナルマッピング)/OR Mapper.直接 SQL 文を書く代わりに非常に短いコードでデータベースの読み書きを行える機能。[link](https://qiita.com/penguin_note/items/adb0b9bf7c13c1b1d44d#%E3%81%9D%E3%82%82%E3%81%9D%E3%82%821-activerecord%E3%81%A8%E3%81%AF)

### 疑問点

- .all の定義場所がわからない。

### マイクロポストの文字数 140 文字に制限

- バリデーション（validation）を使って制限

```rb
# app/models/micropost.rb
class Micropost < ApplicationRecord
  validates :content, length: { maximum: 140 }
end
```

### ユーザーは <u>複数マイクロポスト</u> を持っている

- 1 人ユーザーに、<u>複数</u>マイクロポスト。

```rb
# app/models/user.rb
class Micropost < ApplicationRecord
  has_many :microposts
end
```

- 1 マイクロポストは、<u>1 ユーザーのみ</u>属する。

```rb
# app/models/micropost.rb
class Micropost < ApplicationRecord
  belogs_to :user
  validates :content, length: { maximum: 140 }
end
```

1 人ユーザーに、<u>複数</u>マイクロポスト。
![micropost_user_association](/img/micropost_user_association.png "micropost_user_association")

# テスト

よく使うコマンド集
https://railstutorial.jp/chapters/filling_in_the_layout?version=6.0#table-assert_select

# デバッグ

debag gem

- ソースに書いて、tarminal で確認
- `next`と打てば, 処理を追える.
  - `step`はより詳細な確認。(ミドルウェアなどまで)

# helper の場所の決め方

- 分かりやすいところに置く
  例）アイコン画像(Gravatar)取得。
  - users_helper に置く。
    - microPosts_helper では使わない。
    - 全体で使うわけではない。

# エラーメッセージは パーシャル化

DIR: views/`shared/_error_messages.html.erb`

```rb
<%= shared/error_messages %>
```

```erb
<% if @user.errors.any? %>
  <div id="error_explanation">
    <div class="alert alert-danger">
      The form contains <%= pluralize(@user.errors.count, "error") %>.
    </div>
    <ul>
    <% @user.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
```

[RailsTutorial](https://railstutorial.jp/chapters/sign_up?version=6.0#code-f_error_messages)

# flash の書き方

```rb
<% flash.each do |message_type, message| %>
  # 配列に対し、each メソッドを使う際は、左に key, 右に value。
  <div class="alert alert-<%= message_type %>"><%= message %></div>
<% end %>
```

配列に対し、each メソッドを使う際は、左に key, 右に value。

# 本番 と 開発 用の Gem

- サーバー
  - 本番： Puma
  - 開発： WEBrick（1 人くらいしか耐えレナい。
- DataBase
  - 本番： PostgresQl
  - 開発： SqLight（少数しか保存で k ない。

### **本番環境: Web サーバー設定ファイル**

[config/puma.rb](https://railstutorial.jp/chapters/sign_up?version=6.0#code-**production_webserver_config**)

```rb
# heroku用
# Pumaの設定ファイル
max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count
port        ENV.fetch("PORT") { 3000 }
environment ENV.fetch("RAILS_ENV") { ENV['RACK_ENV'] || "production" }
pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }
workers ENV.fetch("WEB_CONCURRENCY") { 2 }
preload_app!
plugin :tmp_restart
```

# Heroku の 設定

[./Procfile](https://devcenter.heroku.com/articles/procfile)

```rb
web: bundle exec puma -C config/puma.rb
```

> Heroku apps include a Procfile that specifies the commands that are executed by the app on startup. You can use a Procfile to declare a variety of process types, including:..

# テストの 意味

- バグを再現テスト を書く
  - **再度バグ** を発生させない。

# Tips-dev

- redirect_to vs render
  - render ： \_path(url)を経由せず, 描画する。
    - なので、常に(0 回目).
      - 「flash のメッセージの振舞い」が変わる。

# 用語

- flash （フラッシュ）
  - 一時的に表示される。（初めてログインし、次回からは表示させない。など）
- メモ化って何
  - 何度も使うんで、インスタンス変数を使っちゃおうぜ。(多分.8 章全編)

---

---

---

---

# 紹介されているリンク集

- Ruby on Rails Tutorial は [Learn Enough to Be Dangerous](https://www.learnenough.com/) シリーズの一つ。
- [エラーメッセージを検索して調べる](https://ja.lmgtfy.com/)
- Rails の作者 David Heinemer Hansson 氏による有名な動画[「15 分で作るブログ 」](https://www.youtube.com/watch?v=Gzj723LkRJY)
- “[scalable by default](https://www.youtube.com/watch?v=8evXWvM4oXM&feature=youtu.be)”という動画では、Rails 6 以降の重要な部分、すなわち Rails アプリがどれほど大きく成長しても Rails はスケールできるということが説明されています。
- [Gravatar](https://ja.gravatar.com/)：プロフィール写真。無料のサービスで、プロフィール写真をアップロードして、指定したメールアドレスと関連付けることができます。
  - Gravatar はプロフィール写真をアップロードするときの面倒な作業や写真が欠けるトラブル、
  - 画像の置き場所の悩みを解決します。
  - [link](https://railstutorial.jp/chapters/sign_up?version=6.0#sec-a_gravatar_image)

# Rails 採用企業

> - Airbnb
> - SoundCloud
> - Disney
> - Hulu
> - GitHub
> - Shopify といったさまざまな企業はもちろん、
> - 数え切れないほどのフリーランサー
> - 独立系開発会社
> - スタートアップ企業も Rails を採用しています。

# ディレクトリ構成

| ディレクトリ名 | 説明                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| app/           | モデル、ビュー、コントローラ、ヘルパーなどを含む主要なアプリケーションコード                 |
| app/assets     | アプリケーションで使う CSS（Cascading Style Sheet）、JavaScript ファイル、画像などのアセット |
| bin/           | バイナリ実行可能ファイル                                                                     |
| config/        | アプリケーションの設定                                                                       |
| db/            | データベース関連のファイル                                                                   |
| doc/           | マニュアルなど、アプリケーションのドキュメント                                               |
| lib/           | ライブラリやモジュール置き場                                                                 |
| log/           | アプリケーションのログファイル                                                               |
| public/        | エラーページなど、一般（Web ブラウザなど）に直接公開するデータ                               |
| bin/rails      | コード生成、コンソールの起動、ローカルの Web サーバーの立ち上げなどで使う Rails スクリプト   |
| test/          | アプリケーションのテスト                                                                     |
| tmp/           | 一時ファイル                                                                                 |
| README.md      | アプリケーションの簡単な説明                                                                 |
| Gemfile        | このアプリケーションに必要な Gem の定義ファイル                                              |
| Gemfile.lock   | アプリケーションで使われる gem のバージョンを確認するためのリスト                            |
| config.ru      | Rack ミドルウェア用の設定ファイル                                                            |
| .gitignore     | Git に取り込みたくないファイルを指定するためのパターン                                       |
