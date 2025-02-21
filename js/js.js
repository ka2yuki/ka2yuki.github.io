// Topに戻るボタン
function setScrollTopBtn(path) {
    // window.innerHeight; commetnout2025年2月21日
    const img = document.createElement('img');
    // img.src = path | undefined;
    // これだとpath末尾に 0 が代入される..
    img.src = path;
    // alert(path);
    // alert(img.src);
    img.style = "position: fixed; right: 10px;bottom: 10px; width: 120px; cursor: pointer;z-index:999;";
    img.classList.add('fade');
    img.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(img);

    window.addEventListener("scroll", () => {
        if (window.innerHeight < window.scrollY) {
            img.classList.add('show');
        } else {
            img.classList.remove('show');
        }
    });

    // <a href="#"><img src="./assets/images/top/bt-top.png" alt="" style="position: fixed; right: 10px;bottom: 10px; width: 120px; cursor: pointer;"></a>
}

window.addEventListener('DOMContentLoaded', function (params) {
    // コーダー: https:ka2yuki.github.io
    const div = this.document.createElement('div');
    div.style = "position:fixed; bottom:0; width:100vw; text-align:center; padding: 20px 0;background: #33333378; z-index: 999;color:white;";
    div.innerHTML = "開発中";
    div.title = '開発者サイト：https:ka2yuki.github.io';
    this.document.body.prepend(div);
})