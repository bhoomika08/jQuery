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
    this.$blogPost.on("click", "a", function() {
      event.preventDefault();
      _this.loadContent(this);
    });
  }

// 1. Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
  createTargetDiv() {
    let blogHeadings = this.$blogPost.find(".blogHeading");
    $(blogHeadings).each(function() {
      let targetDiv = $('<div></div>');
      targetDiv.css({
        'background-color': "lightblue",
      });
      $(this).after(targetDiv);
      $(this).data("targetDiv", targetDiv);
    });
  }

// 3. Use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div.  
  loadContent(element) {
    let id = $(element).attr("data-post");
    $(element).parent().data("targetDiv").load('data/blog.html ' + id);
  }
}

new Load("#blog").init();
