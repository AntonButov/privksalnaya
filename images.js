/** Фото квартиры (общий список для главной и gallery.html). */
const IMAGES = [
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853b880d1.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/711x450/69f4853cb2d23.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853dc78b8.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/1020x690/69f4853ec7993.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f4853fa6102.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485408ce3f.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485419bfb9.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f48542ad18a.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f485438e886.jpg",
  "https://static.sutochno.ru/doc/files/objects/2/297/384/69f4854480a97.jpg",
].map((u) =>
  u.startsWith("//") ? "https:" + u : u.startsWith("http") ? u : "https://" + u
);
