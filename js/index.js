$(document).ready(function () {
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");
  const headerTop = document.querySelector(".header__top");
  const menu = document.querySelector(".menu");
  const headerHeight = header.getBoundingClientRect().height; //высота шапки
  const windowWidth = document.documentElement.clientWidth; //шрина окна

  if (windowWidth > 1025) {
    menu.style = `padding-top: ${headerHeight}px;`;
  }
  // изменение контента в шапке при малых экранах
  if (document.documentElement.clientWidth < 860)
    headerTop.querySelectorAll("span").forEach((span, index) => {
      const spanText = ["Покупка", "Инвестиции", "Аренда"];
      span.innerHTML = spanText[index];
    });
  //отступ главного экрана в зависимости от высоты шапки
  main.style = `padding-top: ${header.getBoundingClientRect().height}px;`;

  // менюшка
  $(".header__burger-menu,.menu__header__close").click(function () {
    $(".header__burger-menu, .menu").toggleClass("active");
  });
  
});
