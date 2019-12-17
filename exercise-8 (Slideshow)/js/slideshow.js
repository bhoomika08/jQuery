class Slideshow {
  constructor() {
    const selectors = {
      bodyTag: "body",
      slideshowId: "#slideshow",
      slideClass: ".slideshowItem",
      navAreaId: "navArea"
    };
    
    const slideConfig = {
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
    this.$body = $(selectors.bodyTag);
    this.$slideshowElement = $(selectors.slideshowId);
    this.$slides = this.$slideshowElement.children(selectors.slideClass);
    this.$navigationArea = $('<div/>', {
      id: selectors.navAreaId,
    })
    this.slideConfig = slideConfig;
    this.totalSlides = this.$slides.length
  }

  init() {
    this.moveSlideshowElementToTop();
    this.createNavigationArea();
    this.startSlideshow();
  }

  startSlideshow() {
    this.hideAllSlides();
    this.toggleSlides(this.slideConfig.slideStartNumber);
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
  toggleSlides(currentSlide) {
    currentSlide = this.setSlideNumber(currentSlide);
    this.displayCurrentSlide(currentSlide);
    this.$slides.eq(currentSlide).fadeIn(this.slideConfig.fadein_interval)
                                 .delay(this.slideConfig.delay_interval)
                                 .fadeOut(this.slideConfig.fadeout_interval,() => {
      this.toggleSlides(++currentSlide);
    });
  }

//3. When you get to the end of the list, start again at the beginning.
  setSlideNumber(slideNumber) {
    if (slideNumber >= this.totalSlides) {
      slideNumber = this.slideConfig.slideInitialNumber;
    }
    return slideNumber;
  }

/* 4. create a navigation area under the slideshow that shows 
how many images there are and which image you're currently viewing.*/
  createNavigationArea() {
    this.$navigationArea.css(this.slideConfig.navAreaCssProperties);
    $(this.$slideshowElement).append(this.$navigationArea); 
  }

  displayCurrentSlide(slideNumber) {
    this.$navigationArea.html(
    `Number of Slides: ${this.totalSlides} <br>
    You are currently viewing slide: ${slideNumber +1}`
    );
  }
}

new Slideshow().init();
