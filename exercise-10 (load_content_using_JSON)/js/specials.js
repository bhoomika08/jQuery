class Specials {
  constructor(specialsId) {
    this.$specials = $(specialsId);
    this.$select = $("select");
    this.$form = $("#specials form");
    this.$targetDiv = $("<div></div>");
  }
  
  init() {
    let promise = new Promise(function(resolve,reject) {
      let data = $.getJSON('data/specials.json');  
      if(data) {
        resolve(data);
      } else {
        reject();
      }
    });
    promise.then((data) => {
      this.data = data;
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
  this.$form.append(this.$targetDiv);
}

// 2. Bind a click event to the headline
  bindEvents() {
    let _this = this;
    this.$select.on("change", function() {
      event.preventDefault();
      _this.showSpecialsContent(this);
    });
  }

// 3. Use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div.  
  showSpecialsContent(option) {
    var specialData = this.data[$(option).val()];
    
    if(specialData) {
      let title = specialData['title'],
          text = specialData['text'],
          imageSource = specialData['image'].substring(1, specialData['image'].length),
          color = specialData['color'];

      this.$targetDiv.empty();
      this.$targetDiv.css("color", color);
      this.$targetDiv.append('<h2>' + title + '</h2>' + text + '<br>')
      this.$targetDiv.append("<img src='" + imageSource + "'>");
    } else {
      this.$targetDiv.empty();
    }
  }

// 4. Finally, because the form is now Ajax-enabled, remove the submit button from the form.  
  removeSubmitButton() {
    this.$specials.find(".buttons").remove();
  }
}

new Specials("#specials").init();
  