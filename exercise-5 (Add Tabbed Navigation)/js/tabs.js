class TabbedNavigation {
	constructor() {
    this.allModules = $('.module');
    this.unorderedList = $('<ul></ul>');
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
    $('.module:first').before(this.unorderedList);
	}

//3. Iterate over the modules using $.fn.each. For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.
	addListItemToUnorderedList() {
		this.allModules.each((index, value) => {
			var $listItemText = $(value).find('h2').text();
		  var $listItem = $('<li>' + $listItemText + '</li>');
		  this.unorderedList.append($listItem);
		});
	}

//4. Bind a click event to the list item
  bindEvents() {
  	let _this = this;
  	this.unorderedList.find('li').bind({
  		'click': function() {
  			_this.bindClickEventToListItem(this);
  		} 
  	});
  }

  bindClickEventToListItem(listItem) {
  	let tab = $("div#" + $(listItem).text().toLowerCase());
    this.allModules.hide();
    tab.show();
    this.unorderedList.children().removeClass("current")
    $(listItem).addClass("current");
  }

//5. Finally, show the first tab.
  showFirstTab() {
    this.allModules.first().show();
    this.unorderedList.find('li:first').addClass("current");
  }
}

new TabbedNavigation().init(); 