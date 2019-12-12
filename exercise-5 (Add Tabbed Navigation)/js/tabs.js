class Tabs {
  constructor(moduleSelector) {
    this.allModules = $(moduleSelector);
    this.unorderedList = $('<ul></ul>');
    this.currentClass = "current";
  }

  init() {
    this.hideAll(this.allModules);
    this.createUnorderedList();
    this.addListItemToUnorderedList();
    this.bindEvents();
    this.showFirstTab();
  }

//1. Hide all of the modules.
  hideAll(elements) {
    elements.hide();
  }

//2. Create an unordered list element before the first module.
  createUnorderedList() {
    $(this.allModules).first().before(this.unorderedList);
  }

//3. Iterate over the modules using $.fn.each. For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.
  addListItemToUnorderedList() {
    this.allModules.each((index, value) => {
      let $listItemText = $(value).find("[data-heading]").text();
      let $listItem = $('<li class="module_heading">' + $listItemText + '</li>');
      this.unorderedList.append($listItem);
    });
  }

//4. Bind a click event to the list item
  bindEvents() {
    let _this = this;
    this.unorderedList.find('.module_heading').on('click', function() {
      _this.bindClickEventToListItem(this);
    });
  }

  bindClickEventToListItem(listItem) {
    let tab = $("#" + $(listItem).text().toLowerCase());
    this.allModules.hide();
    tab.show();
    this.unorderedList.children().removeClass(this.currentClass);
    $(listItem).addClass(this.currentClass);
  }

//5. Finally, show the first tab.
  showFirstTab() {
    this.allModules.first().show();
    this.unorderedList.find('.module_heading:first').addClass(this.currentClass);
  }
}

new Tabs('.module').init();
