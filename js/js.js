// Topに戻るボタン
function setScrollTopBtn(path) {
    window.innerHeight;
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