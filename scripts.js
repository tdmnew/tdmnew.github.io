var width = document.body.clientWidth;
var navItems = document.querySelectorAll(".navButtons")


console.log(width)

if(width < 1100) {
  console.log(navItems)
  // navItems.style.color = "red"
  document.querySelectorAll(".navButtons").style.color = "red";
}


// Get the page width and load it into a variable.

// if page width is less than mobile port width
  // disable transition
//
