const cssFile = "https://ka2yuki.github.io/css/fonts.css";
const version = Date.now();

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `${cssFile}?v=${version}`;

document.head.appendChild(link);