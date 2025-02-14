場所

- [gist](https://gist.github.com/ka2yuki)
- qiita


> ・imgタグには直接widthで大きさを指定する（img {max-width: 100%; height: auto; }としておけばそれ以下のレイアウト幅でも自動で可変され、崩れにくくなります）  
・↑SPではCSSで、必要に応じて画像幅を指定して大きさを調整する。  
・1カラムのとき、幅70%等にせず、1カラムはmax-width: 〇〇〇〇px;と、px単位で指定すると、画面幅が変わってもデザインが崩れにくくなる。  
　※2カラム以上の時に各カラムで幅%を使う。[slack link](https://ktuk-dev.slack.com/archives/C082W8CGZE0/p1738211417663199?thread_ts=1735755985.323739&cid=C082W8CGZE0)


パンくずcode
```html
<section class="breadcrumbs">
    <div class="wrap">
        <span>
            <a href="/" style="color: unset;">
                トップページ
                <!-- <i class="fa-solid fa-house" aria-hidden="true"></i> -->
            </a>
        </span>
        <span>お問い合わせ</span>
        <span>お問い合わせ確認</span>
        <span>お問い合わせ完了</span>
    </div>
</section>
```
```html
<button class="square">
    <a href="/">
        <div class="wrap">
            トップページへ
            <img src="./assets/images/works/bt-arrow.png" alt="アイコン画像" />
        </div>
    </a>
</button>
```
```html
<header>
    <nav>
        <ul>
            <li>
                <a href="https://ka2yuki.github.io">github</a>
            </li>
        </ul>
    </nav>
</header>
```