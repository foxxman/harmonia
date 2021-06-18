document.addEventListener("DOMContentLoaded", () => {
  // console.log("page downloaded");
  const customSlider = document.querySelector(".animated__scroll"); //блок-слайдер
  const customSliderTrack = customSlider.querySelector(
    ".animated__scroll__track"
  ); //оболочка слайдов
  const customSlides = customSliderTrack.querySelectorAll(".slide"); //слайды
  const Pi = Math.PI; //число ПИ
  const windowWidth = document.documentElement.clientWidth; //шрина окна

  let customSliderTrackHight = customSliderTrack.getBoundingClientRect().height; //высота оболочки
  let radians,
    trackPadding = 75;

  //ФУНКЦИИ====================================================

  //анимация при скролле слайда
  const sliderMotion = () => {
    customSlides.forEach((slide) => {
      //изменения margin-top слайда
      radians = (2 * Pi * $(slide).offset().left) / windowWidth;
      slide.style = `margin-top: ${Math.sin(radians) * 32.5 + 32.5}px`;
      //изменения padding-bottom оболочки
      const customSliderTrackHightNew =
        customSliderTrack.getBoundingClientRect().height; //новая высота оболочки
      trackPadding =
        trackPadding + (customSliderTrackHight - customSliderTrackHightNew);
      customSliderTrack.style = `padding-bottom: ${trackPadding}px`;
    });
  };

  //СОБЫТИЯ====================================================
  if (windowWidth > 1000) {
    customSlider.addEventListener("scroll", sliderMotion); //прокрутка слайдера
    sliderMotion();
  }

  //ВЫЗОВ ФУНКЦИЙ====================================================
});
