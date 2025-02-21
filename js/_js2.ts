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

function setImg(url: string, alt?: string) {
  const img = document.createElement('img');
  // ts.
  // const selector:HTMLDivElement = document.querySelector('palams') || null;
  img.src = url;
  img.loading = "lazy";
  // img.alt = alt;
}

function bmc() {
  // buy me a coffee: button
  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
  script.setAttribute('data-name', 'bmc-button');
  script.setAttribute('data-slug', 'ka2yuki');
  script.setAttribute('data-color', '#40DCA5');
  script.setAttribute('data-emoji', '');
  script.setAttribute('data-font', 'Lato');
  script.setAttribute('data-text', 'Buy me a coffee');
  script.setAttribute('data-outline-color', '#000');
  script.setAttribute('data-font-color', '#fff');
  script.setAttribute('data-coffee-color', '#FFDD00');
}