class Navigation {
  constructor(navList) {
    this.$navList = $(navList);
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$navList.children().hover(this.showSubmenu, this.hideSubmenu);
  }

//1. Hovering over an item in the main menu should show that item's submenu items, if any.
  showSubmenu() {
    $(this).addClass("hover").find(".subMenu").show();
  }

//2. Exiting an item should hide any submenu items.
  hideSubmenu() {
    $(this).removeClass("hover").find('.subMenu').hide();
  }
}

new Navigation("#nav").init();
