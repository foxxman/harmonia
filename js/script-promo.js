$(document).ready(function () {
  const header = document.querySelector(".header");
  const mainPromo = document.querySelector(".main.promo");
  const headerTop = document.querySelector(".header__top");
  const body = document.querySelector("body");

  // изменение контента в шапке при малых экранах
  if (document.documentElement.clientWidth < 860)
    headerTop.querySelectorAll("span").forEach((span, index) => {
      const spanText = ["Покупка", "Инвестиции", "Аренда"];
      span.innerHTML = spanText[index];
    });
  //отступ главного экрана в зависимости от высоты шапки
  // console.log(header.clientHeight);
  mainPromo.style = `padding-top: ${header.getBoundingClientRect().height}px;`;

  // менюшка
  $(".header__burger-menu,.menu__header__close").click(function (event) {
    $(body).toggleClass("overflow");
    $(".header__burger-menu, .menu").toggleClass("active");
  });


  //=================================================================
  //ПРОМОТКА БЛОКА СОЦСЕТЕЙ
  //=================================================================
  let netsBlockHeader,
    netsBlockParent,
    netsBlockBottom,
    distanceBottom,
    distanceTop,
    helloBottom,
    maxAdd,
    firstScroll = true;

  const hello = document.querySelector(".hello");
  const netsParent = document.querySelector(".hello__nets"); //родительский блок подвижного
  const netsBlock = document.querySelector(".hello__nets__block "); //подвижный блок
  const windowHeight = document.documentElement.getBoundingClientRect().height; //высота окна
  const windowWidth = document.documentElement.clientWidth; //шрина окна
  const netsBlockHeight = netsBlock.getBoundingClientRect().height; //высота подвижного блока
  // const netsBlockWidth = netsBlock.clientWidth; //шрина подвижного блока
  const headerHeight = header.getBoundingClientRect().height; //высота шапки
  const browserHeaderHeight = window.screen.height - window.innerHeight;
  const titleBlock = document.querySelector(".title-block");
  const menu = document.querySelector(".menu");

  if (windowWidth > 1025) {
    menu.style = `padding-top: ${headerHeight}px;`;
  }

  distanceTop = (windowHeight - headerHeight - netsBlockHeight) / 2; //целевой отступ от подвижного блока сверху и снизу
  distanceBottom = distanceTop;

  if (windowWidth < 700) {
    titleBlockHeight =
      window.screen.height -
      browserHeaderHeight -
      headerHeight -
      netsParent.clientHeight;
    titleBlock.style = `height: ${titleBlockHeight}px;`;
  }

  //обновление переменных при скролле
  const initVariables = () => {
    if (firstScroll) {
      //при первом скролле определяем эти переменные
      helloBottom =
        hello.getBoundingClientRect().height + $(hello).offset().top; // высота section hello
      maxAdd = helloBottom - $(netsParent).offset().top - netsBlockHeight;
      firstScroll = !firstScroll;
    }
    //расстояние от блока с соцсетями до низа шапки
    netsBlockHeader = netsBlock.getBoundingClientRect().top - headerHeight;
    //расстояние от подвижного блока до верха родителя
    netsBlockParent =
      netsBlock.getBoundingClientRect().top -
      netsParent.getBoundingClientRect().top;
    //расстояние от нижнего края окна до подвижного блока
    netsBlockBottom =
      windowHeight - netsBlock.getBoundingClientRect().top - netsBlockHeight;
  };
  if (windowWidth > 700)
    window.addEventListener("scroll", () => {
      initVariables();

      if (netsBlockHeader < distanceTop) {
        let top = netsBlockParent + (distanceTop - netsBlockHeader); //добавочный отступ сверху
        if (top > maxAdd) top = maxAdd;
        netsBlock.style = `top: ${top}px;`;
        // console.log("down");
      }

      if (netsBlockBottom < distanceBottom) {
        let top = netsBlockParent - (distanceBottom - netsBlockBottom);
        if (top < 0) top = 0;
        netsBlock.style = `top: ${top}px;`;
        // console.log("up");
      }
    });

  //=================================================================
  //ПРОМОТКА КНИЖКИ
  //=================================================================
  let bookImgHeader, bookImgToParent, bookImgAdd, bookImgRemove;
  const bookImgParent = document.querySelector(".book__img");
  const bookImg = document.querySelector(".book__img img");
  const bookImgHeight = 0.9 * bookImg.clientHeight; //высота книжки
  // 0.9 - примерная высота без тени снизу

  const bookDistance = (windowHeight - headerHeight - bookImgHeight) / 2;

  window.addEventListener("scroll", () => {
    //расстояние от книжки до низа шапки
    bookImgHeader = bookImg.getBoundingClientRect().top - headerHeight;
    //расстояние от книжки до верха родителя
    bookImgToParent =
      bookImg.getBoundingClientRect().top -
      bookImgParent.getBoundingClientRect().top;
    //расстояние от нижнего края окна до книжки
    bookImgBottom =
      windowHeight - bookImg.getBoundingClientRect().top - bookImgHeight;
    if (windowWidth > 1230) {
      if (bookImgHeader < bookDistance) {
        bookImgAdd = bookImgToParent + (bookDistance - bookImgHeader);
        bookImg.style = `top: ${bookImgAdd}px`;
      }
      if (bookImgBottom < bookDistance) {
        bookImgRemove = bookImgToParent - (bookDistance - bookImgBottom);
        if (bookImgRemove < 0) {
          bookImgRemove = 0;
        }
        bookImg.style = `top: ${bookImgRemove}px`;
      }
    }
  });
});
