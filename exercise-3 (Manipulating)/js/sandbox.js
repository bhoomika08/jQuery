// 1. Add five new list items to the end of the unordered list #myList.
let myItems = [];
let myList = $( "#myList" );
for (let i = 8; i <= 12; i++ ) {
  myItems.push( "<li>List item " + i + "</li>" );
}
myList.append( myItems.join( "" ));


// 2. Remove the odd list items    
$("#myList li:odd").remove();    
    

// 3. Add another h2 and another paragraph to the last div.module
let newHeading = $( "<h2>", {
  html: "This is a new heading",
});

let newParagraph = $("<p>", {
  html: "This is a new paragraph",
});

$("div.module:last").append(newHeading).append(newParagraph);


// 4. Add another option to the select element; give the option the value "Wednesday"
let newOption = $("<option>", {
  value: "Wednesday",
  text: "Wednesday",
});

$("#specials select[name='day']").append(newOption);
 

// 5. Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it. 
let newDiv = $("<div>", {
  "class": "module",
}).append($("img").first().clone());

newDiv.insertAfter('div.module:last');    
  