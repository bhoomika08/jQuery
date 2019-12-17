class Load {
  constructor(blogId) {
    this.$blogPost = $(blogId);
  }

  init() {
    this.createTargetDiv();
    this.bindEvents();
  }

// 2. Bind a click event to the headline
  bindEvents() {
    let _this = this;
    this.$blogPost.on("click", "a", () => {
      event.preventDefault();
      this.loadContent(event.target);
    });
  }

// 1. Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
  createTargetDiv() {
    let blogHeadings = this.$blogPost.find(".blogHeading");
    $(blogHeadings).each((index, element) => {
      let targetDiv = $('<div></div>');
      targetDiv.css({
        'background-color': "lightblue",
      });
      $(element).after(targetDiv);
      $(element).data("targetDiv", targetDiv);
    });
  }

// 3. Use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div.  
  loadContent(element) {
    let id = $(element).data("post");
    //$(element).parent().data("targetDiv").slideToggle("slow");
    $(element).parent().data("targetDiv").load('data/blog.html ' + id);
   // $(element).parent().data("targetDiv").slideToggle("slow");
  
  }
}

new Load("#blog").init();
