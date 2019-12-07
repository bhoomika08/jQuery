class HiddenText {
  constructor() {
    this.$module = $('div#blog');
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    let _this = this;
    this.$module.find("li").bind({
      "click": function() {
        event.preventDefault();
        _this.showHideText(this);
      } 
    });
  }

//1. Clicking on a headline in the #blog div should slide down the excerpt paragraph
//2. Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs.
  showHideText(listItem) {
    let $listItem = $(listItem);
    $listItem.find("p.excerpt").slideToggle("slow");
    $listItem.siblings().find("p:visible").slideUp("slow");
  }
}

new HiddenText().init();