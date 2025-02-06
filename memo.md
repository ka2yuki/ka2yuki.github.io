場所

- [gist](https://gist.github.com/ka2yuki)
- qiita


> ・imgタグには直接widthで大きさを指定する（img {max-width: 100%; height: auto; }としておけばそれ以下のレイアウト幅でも自動で可変され、崩れにくくなります）  
・↑SPではCSSで、必要に応じて画像幅を指定して大きさを調整する。  
・1カラムのとき、幅70%等にせず、1カラムはmax-width: 〇〇〇〇px;と、px単位で指定すると、画面幅が変わってもデザインが崩れにくくなる。  
　※2カラム以上の時に各カラムで幅%を使う。[slack link](https://ktuk-dev.slack.com/archives/C082W8CGZE0/p1738211417663199?thread_ts=1735755985.323739&cid=C082W8CGZE0)


# パンくず
```html
<section class="breadcrumbs">
    <div class="wrap">
        <i class="fa-solid fa-house"></i><span>ホーム</span><span>...</span><span>Webアドバンスの特長</span>
    </div>
</section>

<section class="breadcrumbs">
    <div class="wrap">
        <span><a href="index.html" style="color: unset;">
                <i class="fa-solid fa-house"></i>
            </a></span>
        <span>...</span>
        <span>Webアドバンスの特長</span>
    </div>
</section>

<section class="breadcrumbs">
    <div class="wrap">
        <span>
            <i class="fa-solid fa-house"></i>
        </span>
        <span>...</span>
        <span>Webアドバンスの特長</span>
    </div>
</section>
```