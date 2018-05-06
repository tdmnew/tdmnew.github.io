$(".header").hide(0)

var navItems = $("#about, #blog, #projects");

$(document).ready(function(){
    $(".header").fadeIn(500)
    var size = $(document).width()

    // Use animation if using desktop
    if (size >= 746){
      navItems.animate({width: "245px"}, "slow");
      navItems.animate({height: "340px"}, "slow", function(){
        $(".navText").animate({fontSize: "2em"}, "slow")});
  }
});

$(window).resize(function(){
  var size = $(document).width()
  if (size >= 746) {
    $(".navText").css({"fontSize": "2em"})
    navItems.css({"height": "340px", "width": "245px"})
  } else {
    navItems.css({"height": "", "width": ""})
    $(".navText").css({"fontSize": ""})
  }
});
