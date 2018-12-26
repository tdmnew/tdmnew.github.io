$(".header").hide(0)
$("#topAbout, #topBlog, #topProjects").hide(0);

var navItems = $("#about, #blog, #projects");
var firstAnimationPlayed = false; //determines whether .navTop should be displayed
var navAnimationPlayed = false;

var activeTab;

// On load, play animation (If using desktop)
$(document).ready(function(){
    $(".header").fadeIn(500);
    var size = $(document).width();

    // Use animation if using desktop
    if (size >= 746){
      navItems.animate({height: "340px"}, "slow", function(){
        $(".navText").animate({fontSize: "2em"}, "slow")});
  }
});

//Scale based on mobile/desktop
$(window).resize(function(){
  var size = $(document).width();
  if (size >= 746) {
    $(".navText").css({"fontSize": "2em"});
    navItems.css({"height": "340px"});
    if(firstAnimationPlayed == false){
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
  var clickedIcon = "#" + $(this).attr('id');
  var otherText;
  var otherIcons;

  // Prevent clicks on already active tab
  if (clickedIcon === activeTab) {
    return;
  }
  //Prevent clicks until animation completes
  if ( $(':animated' ).length) {
    return false;
  }

  // unbind event handler for intro nav items once clicked.
  if (firstAnimationPlayed === false) {
    firstAnimationPlayed = true;
    $("#projects, #blog, #about").off('click');
  };

  //Return the bacgkround image to the activeTab following a transition
  if (activeTab === "#topAbout") {
    $("#about").css({"background-image":"url(about.jpg)"})
  } else if (activeTab === "#topProjects") {
    $("#projects").css({"background-image":"url(projects.jpg)"})
  } else if (activeTab === "#topBlog") {
    $("#blog").css({"background-image":"url(blog.jpg)"})
  }

  //passes the rest of the arguements to the animateNavigation function depending
  //on click
  if (clickedIcon === "#about"||clickedIcon === "#topAbout"){
    clickedIcon = $("#about");
    otherText = $("#blogH2, #projectsH2");
    otherIcons = $("#blog, #projects");
    activeTab = "#topAbout"
  } else if (clickedIcon === "#blog"||clickedIcon === "#topBlog") {
    clickedIcon = $("#blog");
    otherText = $("#aboutH2, #projectsH2");
    otherIcons = $("#about, #projects");
    activeTab = "#topBlog"
  } else if (clickedIcon === "#projects"||clickedIcon === "#topProjects") {
    clickedIcon = $("#projects");
    otherText = $("#aboutH2, #blogH2");
    otherIcons = $("#about, #blog");
    activeTab = "#topProjects"
  };
  animateNavigation(clickedIcon, otherIcons, otherText);
});

function animateNavigation(clickedIcon, otherIcons, otherText){
  var size = $(document).width();
  if (size < 746) { //Don't play animation if on mobile mode
    displayText(clickedIcon);
    otherText.hide(0);
    otherIcons.hide(0);
    $("#topAbout, #topBlog, #topProjects").show(0);
    navAnimationPlayed = true;

  } else {
    //Check if animation has already ran
    if (navAnimationPlayed === true) {
      $(clickedIcon).show();
      otherText.show();
      otherIcons.show();

      $(clickedIcon).animate({width: "100%"}, 3000)
      otherIcons.animate({width: ""}, 3000, function(){
        otherIcons.css({"opacity": "0.5"})
        otherText.hide(0);
        otherIcons.hide(0);
        displayText(clickedIcon);
      });
    } else { //Otherwise play first animation
      otherIcons.animate({width: ""}, 3000, function(){
        otherText.hide(0);
        otherIcons.hide(0);})

      $(clickedIcon).animate({width: "100%"}, 3000, function(){
        displayText(clickedIcon)});

      $("#topAbout").toggle(1000);
      $("#topBlog").toggle(1500);
      $("#topProjects").toggle(2000);

      navAnimationPlayed = true; // Ensures only top loop is played from now on
    };
  };
};


function displayText(clickedIcon){
  //loads html page in between Div tag on click. If no file, returns nothing

  //Remove background image while page active and set opacity to none
  $(clickedIcon).css({"background-image":"none", "opacity":"1", "text-shadow":"none", "cursor":"default"})
  $("#" + clickedIcon[0].id + ":hover").css({"opacity":"none", "text-shadow":"none"})

  if(clickedIcon[0].id === "about") {
    $(clickedIcon).load("about.html");
  } else if (clickedIcon[0].id === "projects") {
    $(clickedIcon).load("projects.html");
  } else if (clickedIcon[0].id === "blog") {
    $(clickedIcon).load("blog.html");
  } else {
    return;
  }

  //TODO stop this from repeating each loop (It's redundant!)
  //TODO topNav no longer activates after zooming in and out and then playing the navigation animation
  $(clickedIcon).css({"overflow-y": "scroll"})
};
