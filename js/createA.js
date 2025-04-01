/*
 * Copyright (c) 2025 https://ka2yuki.github.io
 * Released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

function createA(
	{
		href,
		text,
		target = '_blank',
		className = '',
		id = '',
		style = {},
		dataset = {},
		onClickHandler = null
	}
) {
	const a = document.createElement('a'); // <a>タグ作成
	a.href = href;
	a.textContent = text;
	a.target = target;                  // 新しいタブで開く
	a.rel = 'noopenner';
	if (className) a.className = className;
	if (id) a.id = id;
	// styleオブジェクトを回してセット
	for (const [key, value] of Object.entries(style)) {
		a.style[key] = value;
	}
	// for (const [key, value] of Object.entries(style)) の場合:
	// ・style が「空のオブジェクト {}」でも for...of はスルーされる
	// ・style 自体が undefined や null だとエラーになる
	// ・だから 初期値で {} を入れておく設計 にしておくと if (style) いらない

	// datasetを適用
	for (const [key, value] of Object.entries(dataset)) {
		a.dataset[key] = value;
	}

	// onClickイベントを設定（オプション）
	if (onClickHandler) {
		a.addEventListener('click', onClickHandler);
	}

	return a;
}
// 使い方
// const link = createLink({
//   href: 'https://example.com',
//   text: 'Example Site',
//   target: '_self',
//   className: 'my-link',
//   id: 'link1',
// style: {
//   color: 'red',
//   textDecoration: 'none',
//   fontWeight: 'bold'
// }
// dataset: {
//   role: 'button',
//   theme: 'dark'
// },
// onClick: function() {
//   alert('リンクがクリックされました');
// }
// });
// document.body.appendChild(link);

// target, className, id, style など、あとからどんどん追加しやすい
// オブジェクト渡しなら順番気にしなくていい