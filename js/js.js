function setBgImg(selector, url) {
    // !NOTE
    // url path はそのプログラムがあるファイルの場所からの PATH になる.
    const selected = document.querySelector(selector) || null;
    // ts.
    // const selector:HTMLDivElement = document.querySelector('palams') || null;
    if (!selected) return;
    selected.style.backgroundImage = `url('${url}')`;
    selected.style.backgroundSize = "cover";
    selected.style.backgroundRepeat = "no-repeat";
    selected.style.backgroundColor = 'white';

    // alert(`set ${url}`);
    // console.info(`set ${url}`);
}
