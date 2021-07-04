import blockScroller from "./scroll-blocks.js";

$(document).ready(function () {
  const cover = document.querySelector(".cover");
  const header = document.querySelector(".header");
  const mainPromo = document.querySelector(".main.promo");
  const headerTop = document.querySelector(".header__top");
  const body = document.querySelector("body");
  const netsParent = document.querySelector(".hello__nets"); //родительский блок подвижного
  const headerHeight = header.getBoundingClientRect().height; //высота шапки
  const browserHeaderHeight = window.screen.height - window.innerHeight; // поле вкладок браузера
  const titleBlock = document.querySelector(".title-block");
  const menu = document.querySelector(".menu");
  const windowWidth = document.documentElement.clientWidth; //шрина окна
  // изменение контента в шапке при малых экранах
  if (document.documentElement.clientWidth < 860)
    headerTop.querySelectorAll("span").forEach((span, index) => {
      const spanText = ["Покупка", "Инвестиции", "Аренда"];
      span.innerHTML = spanText[index];
    });

  window.addEventListener("resize", () => {
    if (header)
      mainPromo.style = `padding-top: ${
        header.getBoundingClientRect().height
      }px;`;
  });
  //отступ главного экрана в зависимости от высоты шапки
  if (header)
    mainPromo.style = `padding-top: ${
      header.getBoundingClientRect().height
    }px;`;

  // менюшка
  // $(".header__burger-menu,.menu__header__close").click(function (event) {
  //   if (windowWidth < 1024) $(body).toggleClass("overflow");
  //   $(".header__burger-menu, .menu").toggleClass("active");
  // });

  //отступ менюшки в зависимости от высоты шапки
  if (windowWidth > 1025) {
    menu.style = `padding-top: ${headerHeight}px;`;
  }

  //вычисление высоты titleBlock
  if (windowWidth < 700) {
    titleBlockHeight =
      window.screen.height -
      browserHeaderHeight -
      headerHeight -
      netsParent.clientHeight;
    titleBlock.style = `height: ${titleBlockHeight}px;`;
  }

  //=================================================================
  //ПРОМОТКА БЛОКА СОЦСЕТЕЙ
  //=================================================================
  const hello = document.querySelector(".hello");
  const netsBlock = document.querySelector(".hello__nets__block "); //подвижный блок
  const bookImg = document.querySelector(".book__img");
  const orangeBlock = document.querySelector(".last__block");

  blockScroller(netsBlock, hello, 700);
  blockScroller(bookImg, orangeBlock, 1200);
});
