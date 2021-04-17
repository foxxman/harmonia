$(document).ready(function () {
  const headerTop = document.querySelector(".header__top");
  // const nets = document.querySelector(".hello__nets");
  const netsBlock = document.querySelector(".hello__nets__block");
  const list = document.querySelector(".hello__description__list");
  const netsBlockIdent =
    (document.documentElement.clientHeight - netsBlock.clientHeight)/2;
  //нижняя точка блока списка
  const listBottom =
    list.clientHeight + $(".hello__description__list").offset().top;
  //верхняя точка дорожки для соцсетей
  const netsTop = $(".hello__nets").offset().top;
  const maxTopAdd = listBottom - netsTop - netsBlock.clientHeight;
  // изменение контента в шапке при малых экранах
  if (document.documentElement.clientWidth < 860)
    headerTop.querySelectorAll("span").forEach((span, index) => {
      const spanText = ["Покупки", "Инвестиции", "Аренда"];
      span.innerHTML = spanText[index];
    });

  // менюшка
  $(".header__burger-menu,.menu__header__close").click(function (event) {
    // e.preventDefault();
    console.log("click");
    $(".header__burger-menu, .menu").toggleClass("active");
  });
  console.log(document.documentElement.clientHeight);
  //перемещение блока nets
  window.addEventListener("scroll", () => {
    if (document.documentElement.clientWidth > 700) {
      let netsBlockTopWindow = netsBlock.getBoundingClientRect().top; //расстояние до nets от окна
      let netsBlockTopParent = netsBlock.offsetTop; //расстояние до nets от родителя
      let netsBlockBottom =
        netsBlock.clientHeight + $(".hello__nets__block").offset().top; //нижняя точка блока с соцсетями
      console.log();
      //расстояние от низа откна до низа блока hello__nets__block
      netsBlockBottomWindow =
        document.documentElement.clientHeight -
        netsBlockTopWindow -
        netsBlock.clientHeight;

      //дв. вниз
      if (netsBlockTopWindow <= netsBlockIdent && netsBlockBottom <= listBottom) {
        let topAdd = netsBlockTopParent + (netsBlockIdent - netsBlockTopWindow);
        //чтобы не перескакивал через границу снизу
        if (topAdd > maxTopAdd) {
          topAdd = maxTopAdd;
        }
        netsBlock.style = `top: ${topAdd}px;`;
      }

      //дв. вверх
      if (netsBlockBottomWindow <= netsBlockIdent && netsBlockTopParent >= 0) {
        let topRemove = netsBlockTopParent - (netsBlockIdent - netsBlockBottomWindow);
        //чтобы не перескакивал через границу сверху
        if (topRemove < 0) {
          topRemove = 0;
        }
        netsBlock.style = `top: ${topRemove}px;`;
      }
    }
  });
});
