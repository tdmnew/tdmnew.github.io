$(".header").hide(0)
$(".navTop").hide(0);

var navItems = $("#about, #blog, #projects");
var navClicked = false; //determines whether .navTop should be displayed
var navAnimationPlayed = false;

var activeIcon;

// On load, play animation (If using desktop)
$(document).ready(function(){
    $(".header").fadeIn(500);
    var size = $(document).width();

    // Use animation if using desktop
    if (size >= 746){
      navItems.animate({height: "75%"}, "slow", function(){
        $(".navText").animate({fontSize: "2em"}, "slow")});
  }
});

//Scale based on mobile/desktop
$(window).resize(function(){
  var size = $(document).width();
  if (size >= 746) {
    $(".navText").css({"fontSize": "2em"});
    navItems.css({"height": "75%"});
    if(navClicked == false){
      navItems.css({"width": "25%"});
    } else {
      $(".navTop").fadeIn(1000);
      navItems.css({"width": "100%"});
    }
  } else {
    $(".navTop").hide(0);
    navItems.css({"height": "", "width": ""});
    $(".navText").css({"fontSize": ""});
  }
});


$("#about, #blog, #projects, #topAbout, #topBlog, #topProjects").click(function( event ){
  var clickedIcon = $(this).attr('id');
  var otherText;
  var otherIcons;

  // unbind event handler for intro nav items once clicked.
  if (navClicked === false) {
    navClicked = true;
    $("#projects, #blog, #about").off('click');
  } else { // turn off top items as well (and turn them on when the animation completes)
    $("#topProjects, #topBlog, #topAbout").off('click');
  }

  //passes the rest of the arguements to the animateNavigation function depending
  //on click
  if (clickedIcon === "about"||clickedIcon === "topAbout"){
    clickedIcon = $("#about")
    otherText = $("#blogH2, #projectsH2");
    otherIcons = $("#blog, #projects");
  } else if (clickedIcon === "blog"||clickedIcon === "topBlog") {
    clickedIcon = $("#blog")
    otherText = $("#aboutH2, #projectsH2");
    otherIcons = $("#about, #projects");
  } else if (clickedIcon === "projects"||clickedIcon === "topProjects") {
    clickedIcon = $("#projects")
    otherText = $("#aboutH2, #blogH2");
    otherIcons = $("#about, #blog");
  }
  animateNavigation(clickedIcon, otherIcons, otherText);
});

function animateNavigation(clickedIcon, otherIcons, otherText){
  //Check if animation has already ran
  if (navAnimationPlayed == true) {
    $(clickedIcon).show();
    otherText.show()
    otherIcons.show()

    $(clickedIcon).animate({width: "100%"}, 4000)
    otherIcons.animate({width: ""}, 4000, function(){
      otherText.hide(0);
      otherIcons.hide(0);

    $("#topProjects, #topBlog, #topAbout").on('click');
    })
  } else {
  otherIcons.animate({width: ""}, 4000, function(){
    otherText.hide(0);
    otherIcons.hide(0);})

  $(clickedIcon).animate({width: "100%"}, 4000, function(){
    $(".navTop").fadeIn(4000)});

  navAnimationPlayed = true;
  }
activeIcon = $(clickedIcon);
};
