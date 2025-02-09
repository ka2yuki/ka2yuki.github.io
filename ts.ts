interface ImgOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
}

function createImgElement(options: ImgOptions): HTMLImageElement {
  const img = document.createElement('img');
  img.src = options.src;
  img.alt = options.alt;

  if (options.width) img.width = options.width;
  if (options.height) img.height = options.height;
  if (options.className) img.className = options.className;
  if (options.id) img.id = options.id;

  return img;
}

// 使用例
const imgElement = createImgElement({
  src: "path/to/image.jpg",
  alt: "Sample image",
  width: 300,
  height: 200,
  className: "custom-img",
  id: "image-1",
});
document.body.appendChild(imgElement);