---
title: Rails-Tutorial.v6
date: "2020-09-20"
---

# 連続ログイン問題

異なるブラウザでログインしている時、ログアウトを２回する。

1. test で, リダイレクトした際, 再度ログアウトする test を書く。
2. ログアウトする際は、ログインしている時だけにする。

# Cookie 問題

異なるブラウザでログインしている時、  
Token はあるけど DB 側の digest が Nil(別ブラウザでログアウトしているので）

1. authenticated で DB 側の digest が Nil の場合, false で弾く。

# rails

- 11. AccountActivations(メール認証)

## No11: AccountActivations

- activation_digest: string
- activated : boolean
- activated_at: datetime

### データモデルを追加.⬆ ️

```sh
rails generate migration add_activation_to_users \
> activation_digest:string activated:boolean activated_at:datetime
```

### Boolean のデフォルト値を, **false**

```sh
class AddActivationToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :activation_digest, :string
    add_column :users, :activated, :boolean, default: false
    add_column :users, :activated_at, :datetime
  end
end
```

- Boolean は, [ **true, false, nil** ]が返される為, デフォで **false** に。

### URL

`/account_activation/トークン/edit`
