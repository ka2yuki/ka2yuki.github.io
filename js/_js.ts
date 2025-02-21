function setFixed(selectedDom: string) {
    const target = document.querySelector<HTMLElement>(selectedDom);
    // 1
    target?.style = "position: fixed;top:0;";
    // 2
    const hoge = `.fixed { position.. }`;
    const hoge2 = {
        className: 'fixed',
        propaties: {
            position: "fixed",
            // etc..
        }
    }
    target?.classList.add(hoge);
}

// try
function setFixed(selectedDom) {
    console.log(selectedDom);
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        const css = `
            .fixed {
                position: fixed;
                top: 0;
            }
        `;
        style.innerHTML = css;
        document.head.appendChild(style);

        const element = document.querySelector(selectedDom);
        console.log('el', element);
        element.classList.add('fixed');
    });
}

function setFixedScrolling(selectedDom) {
    document.addEventListener('scroll', () => {
        setFixed(selectedDom);
    });
}

// chatgpt: https://chatgpt.com/c/67b85005-18c4-8003-a2f8-aac071779465
function setFixed(selectedDom) {
    console.log(selectedDom);
    const element = document.querySelector(selectedDom);

    if (!element) {
        console.error('Element not found:', selectedDom);
        return;  // 要素が見つからない場合は処理を中断
    }

    // スタイルがまだ追加されていない場合にのみ追加
    if (!document.getElementById('fixed-style')) {
        const style = document.createElement('style');
        style.id = 'fixed-style';  // スタイルタグにIDをつけて一意にする
        const css = `
            .fixed {
                position: fixed;
                top: 0;
            }
        `;
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    element.classList.add('fixed');
}

function setFixedScrolling(selectedDom) {
    document.addEventListener('scroll', () => {
        setFixed(selectedDom);
    });
}

// 初期化: DOMがロードされてから動作するように設定
document.addEventListener('DOMContentLoaded', () => {
    setFixedScrolling('.your-element');  // '.your-element'を対象に適切なセレクタに変更
});

