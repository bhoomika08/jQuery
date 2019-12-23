class Specials {
  constructor() {
    const selector = {
      specialsId: "#specials",
      selectTag: "select",
      specialsForm: "#specials form",
      specialsButton: ".buttons",
    }
    this.$specialsDiv = $(selector.specialsId);
    this.$selectBox = $(selector.selectTag);
    this.$form = $(selector.specialsForm);
    this.$specialsButton = $(selector.specialsButton);
    this.$targetDiv = $("<div></div>");
    this.$specialsHeading = $("<h2></h2>");
    this.$specialsParagraph = $("<p></p>");
    this.$specialsImg = $("<img src=''></");
    this.$errorDiv = $("<div></div>");
  }
  
  init() {
    let promise = new Promise(function(resolve,reject) {
      let data = $.getJSON('data/specials.json'); 
      console.log(typeof(data)); 
      if(data) {
        resolve(data);
      } else {
        reject();
      }
    });
    promise.then((data) => {
      this.data = data;
      console.log(typeof(this.data));
      this.createTargetDiv();
    })
    .then(() => {
      this.bindEvents();
    })
    .then(() => {
      this.removeSubmitButton();
    })
    .catch(function(error) {
      console.log("Failure: " + error);
    });
  }

// 1. Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
createTargetDiv() {
  this.$targetDiv.append(this.$specialsHeading);
  this.$targetDiv.append(this.$specialsParagraph);
  this.$targetDiv.append(this.$specialsImg);
  this.$form.append(this.$targetDiv);
  this.$form.append(this.$errorDiv);
}

// 2. Bind a click event to the headline
  bindEvents() {
    this.$selectBox.on("change", () => {
      event.preventDefault();
      this.showSpecialsContent(event.target.value);
    });
  }

// 3. Use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div.  
  showSpecialsContent(option) {
    var specialData = this.data[option];
    this.$errorDiv.hide();
    this.$targetDiv.hide();
    console.log(specialData);
    if(specialData) {
      const {
        "title": title, "text": text, "image": imageSource, "color": color, 
      } = specialData;
      this.$targetDiv.css("color", color);
      this.$specialsHeading.text(title);
      this.$specialsParagraph.text(text);
      this.$specialsImg.attr('src',imageSource);
      this.$targetDiv.show();
    } else {
      this.$errorDiv.text("No data available for selected Option");
      this.$errorDiv.show();
    }
  }

// 4. Finally, because the form is now Ajax-enabled, remove the submit button from the form.  
  removeSubmitButton() {
    this.$specialsDiv.find(this.$specialsButton).remove();
  }
}

(function() {
  new Specials().init();
})();