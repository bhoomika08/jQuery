const selectors = {
  bodyTag: "body",
  slideshowId: "#slideshow",
  slideClass: ".slideshowItem",
  navAreaId: "navArea"
};

const data = {
  slideInitialNumber: 0,
  slideStartNumber: 0,
  fadein_interval: 2000,
  fadeout_interval: 2000,
  delay_interval: 2000,
  navAreaCssProperties: {
    height: "50px",
    backgroundColor: "green",
    color: "white"
  }
};

class Slideshow {
  constructor(selectors, data) {
    this.$body = $(selectors.bodyTag);
    this.$slideshowElement = $(selectors.slideshowId);
    this.$slides = this.$slideshowElement.children(selectors.slideClass);
    this.$navigationArea = $('<div/>', {
      id: selectors.navAreaId,
    })
    this.data = data;
  }

  init() {
    this.moveSlideshowElementToTop();
    this.hideAllSlides();
    this.showHideSlides(this.data.slideStartNumber);
    this.createNavigationArea();
  }

//1. Move the #slideshow element to the top of the body.
  moveSlideshowElementToTop() {
    this.$body.prepend(this.$slideshowElement);
  }

  hideAllSlides() {
    this.$slides.hide();
  }

/*2. Write code to cycle through the list items inside the element; 
fade one in, display it for a few seconds, then fade it out and fade in the next one.*/
  showHideSlides(slideNumber) {
    slideNumber = this.setSlideNumber(slideNumber);
    this.displayCurrentSlide(slideNumber);
    this.$slides.eq(slideNumber).fadeIn(this.data.fadein_interval)
                                .delay(this.data.delay_interval)
                                .fadeOut(this.data.fadeout_interval,() => { 
      this.showHideSlides(++slideNumber);
    });
  }

//3. When you get to the end of the list, start again at the beginning.
  setSlideNumber(slideNumber) {
    if (slideNumber >= this.$slides.length) {
      slideNumber = this.data.slideInitialNumber;
    }
    return slideNumber;
  }

/* 4. create a navigation area under the slideshow that shows 
how many images there are and which image you're currently viewing.*/
  createNavigationArea() {
    this.$navigationArea.css(this.data.navAreaCssProperties);
    $(this.$slideshowElement).append(this.$navigationArea); 
  }

  displayCurrentSlide(slideNumber) {
    this.$navigationArea.html(
    `Number of Slides: ${this.$slides.length} <br>
    You are currently viewing slide: ${slideNumber +1}`
    );
  }
}

new Slideshow(selectors, data).init();
