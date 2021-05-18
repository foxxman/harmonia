$(document).ready(function () {
  console.log('load');
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

  //========код для главной=====================
  let firstScroll = true,
    sectionChoiseTop,
    sectionPlacesDoc,
    topSpace,
    bottomSpace,
    placesBlockDoc,
    placesBlockBottom;
  const placesBlock = document.querySelector(".places__block");
  const placesBlockHeight = placesBlock.getBoundingClientRect().height; //высота подвижного блока
  const sectionChoise = document.querySelector(".choise");
  const windowHeight = document.documentElement.getBoundingClientRect().height; //высота окна
  const sectionPlaces = document.querySelector(".places");
  console.log(placesBlockHeight);

  //обновление переменных при скролле
  const initVariables = () => {
    if (firstScroll) {
      sectionChoiseDoc = $(sectionChoise).offset().top;
      sectionPlacesDoc = $(sectionPlaces).offset().top;
      topSpace = (windowHeight - headerHeight - placesBlockHeight) / 2 - 1;
      bottomSpace = topSpace;
      firstScroll = !firstScroll;
    }
    placesBlockDoc = $(placesBlock).offset().top; //координата относительно документа
    placesBlockHeader = placesBlock.getBoundingClientRect().top - headerHeight;
    placesBlockBottom = placesBlockDoc + placesBlockHeight;
  };

  if (windowWidth >= 1240)
    window.addEventListener("scroll", () => {
      initVariables();
      // console.log(placesBlockHeader, placesBlockDoc, windowHeight);
      //начало движения когда дошли сверху
      if (
        placesBlockHeader < topSpace &&
        (sectionChoiseDoc - placesBlockBottom) > bottomSpace
      ) {
        let top = topSpace + headerHeight;
        placesBlock.style = `position: fixed; top: ${top}px;`;
        console.log("down");
        console.log((sectionChoiseDoc - placesBlockBottom) > bottomSpace )
      }
      // //остановка когда идем вверх
      if (placesBlockDoc < sectionPlacesDoc) {
        placesBlock.style = ``;
        console.log('stop up');
      }
      // //остановка когда долистали до низа
      
      if (sectionChoiseDoc - placesBlockBottom < bottomSpace) {
        placesBlock.style = `position: absolute; top: ${
          $(sectionChoise).offset().top - bottomSpace - placesBlockHeight
        }px;`;
        console.log("stop down");
        console.log(sectionChoiseDoc, placesBlockBottom, bottomSpace)
      }
      // //начало движения когда дошли снизу
      if (placesBlockHeader > topSpace && placesBlockDoc > sectionPlacesDoc) {
        let top = topSpace + headerHeight;
        placesBlock.style = `position: fixed; top: ${top}px;`;
        console.log('up');
      }
    });
});
