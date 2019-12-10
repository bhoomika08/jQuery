class Blog {
  constructor(moduleSelector) {
    this.$module = $(moduleSelector);
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    let _this = this;
    this.$module.find(".blog_list").on("click", function() {
        event.preventDefault();
        _this.showHideText(this);
      } 
    );
  }

//1. Clicking on a headline in the #blog div should slide down the excerpt paragraph
//2. Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs.
  showHideText(listItem) {
    let $listItem = $(listItem);
    $listItem.find(".excerpt").slideToggle("slow");
    $listItem.siblings().find(".excerpt:visible").slideUp("slow");
  }
}

new Blog('#blog').init();
