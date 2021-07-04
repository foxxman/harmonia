//функция получения координат границ блока
const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.top + pageYOffset + elem.clientHeight,
  };
};

const blockScroller = (movedBlock, borderBlock, cancelScroll = 0) => {
  const header = document.querySelector(".header");
  const parentBlock = movedBlock.parentNode;
  let distanceToHeader,
    topCoordinate,
    movedBlockBottom,
    distanceToWindowBottom,
    headerHeight,
    parentWidth,
    parentHeight,
    movedBlockHeight,
    windowHeight,
    windowWidth,
    distanceTop,
    distanceBottom,
    fixedTop,
    bottomBorder,
    fixedBottom,
    fixedLeft,
    startTop;

  const initVariables = () => {
    parentWidth = parentBlock.clientWidth;
    parentHeight = parentBlock.clientHeight;
    movedBlockHeight = movedBlock.clientHeight; // высота подвижного блока
    header ? (headerHeight = header.clientHeight) : (headerHeight = 0); //высота шапки
    windowHeight = window.innerHeight; //высота окна
    windowWidth = window.innerWidth; //шрина окна
    distanceTop = (windowHeight - headerHeight - movedBlockHeight) / 2; //нужная дистанция до подвижного блока от шапки
    distanceBottom = distanceTop; //дистанция до подвижного блока от нижней границы окна
    fixedTop = distanceTop + headerHeight;
    bottomBorder = getCoords(borderBlock).bottom; //нижняя граница "подвижной области"
    fixedBottom = bottomBorder - getCoords(movedBlock).bottom;
    fixedLeft = $(movedBlock).offset().left;
    //расстояние от подвижного блока до верхушки документа изначально
    startTop = getCoords(movedBlock).top;
  };

  //================================================================================================================
  initVariables();

  const updateVariables = () => {
    movedBlockBottom = getCoords(movedBlock).bottom;
    //расстояние от подвижного блока до верхушки документа в данный момент
    topCoordinate = getCoords(movedBlock).top;
    //расстояние от подвижного блока до шапки
    distanceToHeader = movedBlock.getBoundingClientRect().top - headerHeight;
    //расстояние от подвижного блока до низа окна
    distanceToWindowBottom =
      windowHeight -
      (movedBlock.getBoundingClientRect().top + movedBlockHeight);
  };

  const fixBlock = () => {
    movedBlock.style = `position: fixed; top:${fixedTop}px; left:${fixedLeft}px`;
  };

  const fixBlockDown = () => {
    movedBlock.style = `position: relative; top:${fixedBottom}px;`;
  };
  const fixBlockUp = () => {
    movedBlock.style = ``;
  };

  const moveBlock = () => {
    if (distanceToHeader < distanceTop && movedBlockBottom < bottomBorder) {
      // console.log("1");
      fixBlock();
    }

    //остановка блока при прокрутке снизу вверх
    else if (topCoordinate < startTop) {
      // console.log("2");
      fixBlockUp();
    }

    //остановка блока при прокрутке сверху вниз
    else if (movedBlockBottom > bottomBorder) {
      // console.log("3");
      fixBlockDown();
    }

    //фиксация блока при прокрутке снизу вверх
    else if (
      distanceToWindowBottom < distanceBottom &&
      bottomBorder === movedBlockBottom
    ) {
      // console.log("4");
      fixBlock();
    }
  };

  //функция установки min размеров для родителя
  const fixParentSize = () => {
    parentBlock.style = `min-width: ${parentWidth}px;`;
    parentBlock.style.height = parentHeight + "px";
  };

  //================================================================================================================
  //================================================================================================================
 

  if (windowWidth > cancelScroll) {
    fixParentSize();
    updateVariables();
    moveBlock();
    
    window.addEventListener("scroll", () => {
      updateVariables();
      moveBlock();
    });

    window.addEventListener("resize", () => {
      console.log("resize");
      fixBlockUp();
      fixParentSize();
      initVariables();
      updateVariables();
      moveBlock();
    });
  }
};

export default blockScroller;
