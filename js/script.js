$(document).ready(function () {
  const header = document.querySelector(".header");
  const mainPromo = document.querySelector(".main.promo");
  const headerTop = document.querySelector(".header__top");

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
    // e.preventDefault();
    console.log("click");
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
    maxAdd;

  const hello = document.querySelector(".hello");
  const netsParent = document.querySelector(".hello__nets"); //родительский блок подвижного
  const netsBlock = document.querySelector(".hello__nets__block "); //подвижный блок
  const windowHeight = document.documentElement.getBoundingClientRect().height; //высота окна
  const windowWidth = document.documentElement.clientWidth; //шрина окна
  const netsBlockHeight = netsBlock.getBoundingClientRect().height; //высота подвижного блока
  const netsBlockWidth = netsBlock.clientWidth; //шрина подвижного блока
  const headerHeight = header.getBoundingClientRect().height; //высота шапки

  if (windowWidth > 700) {
    distanceTop = (windowHeight - headerHeight - netsBlockHeight) / 2; //целевой отступ от подвижного блока сверху и снизу
    distanceBottom = distanceTop;
  } else {
    distanceTop = 40; //целевой отступ от подвижного блока сверху и снизу
    distanceBottom = (windowHeight - headerHeight - netsBlockHeight) / 2;
  }

  //обновление переменных при скролле
  const initVariables = () => {
    helloBottom = hello.getBoundingClientRect().height + $(hello).offset().top; // высота section hello
    maxAdd = helloBottom - $(netsParent).offset().top - netsBlockHeight;
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

  window.addEventListener("scroll", () => {
    initVariables();
    if (windowWidth > 700) {
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
    } else {
      let top = headerHeight + 11;
      let left = (windowWidth - netsBlockWidth) / 2;
      if (netsBlockHeader < 10) {
        netsBlock.style = `position: fixed; top: ${top}px; left: ${left}px;`;
      }
      if (
        netsParent.getBoundingClientRect().top >
        netsBlock.getBoundingClientRect().top
      ) {
        netsBlock.style = ``;
      }
    }
  });
});
