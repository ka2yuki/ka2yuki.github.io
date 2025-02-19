// Topに戻るボタン
function setScrollTopBtn() {
    const img = document.createElement('img');
    img.src = "./assets/images/top/bt-top.png";
    img.style = "position: fixed; right: 10px;bottom: 10px; width: 120px; cursor: pointer;";
    img.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(img);
    // <a href="#"><img src="./assets/images/top/bt-top.png" alt="" style="position: fixed; right: 10px;bottom: 10px; width: 120px; cursor: pointer;"></a>
}