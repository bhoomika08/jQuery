class EventHandler {
  constructor() {
    const selectors = {
      mainContainer: "#mainContainer",
      addButton: "#addButton",
    }
    this.$mainContainer = $(selectors.mainContainer);
    this.$addButton = $(selectors.addButton);
    this.divCount = 0;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.bindEventToAddButton();
    this.bindEventToRow();
  }

  bindEventToAddButton() {
    this.$addButton.on("click", () => {
      this.addRow();
    });
  }

  bindEventToRow() {
    this.$mainContainer.on("click", ".row", () => {
      this.updateRow(event.target);
    });
  }

  addRow() {
    let $newRow = $("<div/>", {
      class: "row",
      text: `Div Number: ${++this.divCount}`,
      data: {
        "number": this.divCount,
      },
    });
    this.$mainContainer.prepend($newRow);
  }

  updateRow(row) {
    let $row = $(row);
    if($row.data("number") === (this.divCount)) {
      this.removeRow($row);
    } else {
      this.highlightRow($row);
    }
  }

  removeRow($row) {
    $row.remove();
    this.divCount--;
  }

  highlightRow($row) {
    $row.toggleClass("highlight");
  }
}

new EventHandler().init();
