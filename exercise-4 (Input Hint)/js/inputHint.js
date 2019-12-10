class InputHint {
  constructor() {
    this.searchLabel = $("label[for='q']");
    this.searchInput = $("input.input_text");
    this.hintText = this.searchLabel.text();
    this.hintClass = "hint";
  }

  init() {
    this.setText(this.searchInput);
    this.appendClass(this.searchInput, this.hintClass);
    this.removeElement(this.searchLabel);
    this.bindEvents();
  }

//1. Set the value of the search input to the text of the label element
  setText(element) {
    element.val(this.hintText);
  }

//2. Add a class of "hint" to the search input
  appendClass(element, cssClass) {
    element.addClass(cssClass);
  }

//3. Remove the label element
  removeElement(element) {
    element.remove();
  }

  bindEvents() {
    this.searchInput.on({
      "focus": () => this.bindFocusEvent(this.searchInput),
      "blur": () => this.bindBlurEvent(this.searchInput)
    });
  }

//4. Bind a focus event to the search input that removes the hint text and the "hint" class
  bindFocusEvent(element) {
    if(element.val() == this.hintText) {
      element.removeClass(this.hintClass).val("");
    }
  }

//5. Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
  bindBlurEvent(element) {
    if(!element.val().trim()) {
      this.setText(this.searchInput);
      this.appendClass(this.searchInput, this.hintClass);
    }
  }
}

new InputHint().init();