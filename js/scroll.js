/*
 * Copyright (c) 2025 https://ka2yuki.github.io
 * Released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
function setFollowScroll(terget, scrollTop) {
    console.log(scrollTop);
    if (
        scrollTop >= 3825 &&
        scrollTop <= 5776
    ) {
        if (terget) terget.classList.remove("scrolled");
        terget.classList.add("fixed", "fadein");
        console.log(`target: ${terget.classList}`); // console上ではsetされているが 実際のdomに反映されない状態
    }
}
function unsetFollowScroll(terget, scrollTop) {
    console.log(scrollTop);
    if (
        scrollTop > 5776 && scrollTop < 6000
    ) {
        terget.style.zIndex = '-1';
        terget.classList.remove("fixed", "fadein");
        terget.classList.add("scrolled");
    } else {
        terget.classList.remove("fixed", "fadein");
    }
}