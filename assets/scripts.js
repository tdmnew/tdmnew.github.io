var width = document.body.clientWidth;
var mobileWidth = window.matchMedia('(max-width: 400px)')
var desktopSmallWidth = window.matchMedia('(max-width: 1100px)') 
var section = document.getElementsByTagName('section')[0]
let langPictures = document.querySelector('.languagePictures')
let langList = document.querySelector('#languageList')

function createList() {
  let ul = document.createElement('ul')
  let languages = ['Python', 'JavaScript', 'MongoDB', 'Express', 'React', 'NodeJS']
  for(let i = 0; i < languages.length; i++) {
    let li = document.createElement("li")
    li.style.textShadow = 'none'
    li.innerHTML=`${languages[i]}`
    ul.appendChild(li)
  }
  langList.appendChild(ul)
}

//Stop the images overlapping the header etc. when in mobile.
function scalePictures() {
  if(mobileWidth.matches) {
    langPictures.style.display = 'none'
    langList.style.display = 'block'
  } else {
    langPictures.style.display = 'block'
    langList.style.display = 'none'
  }
}

function animateNav(nav, buttons) {

	// Desktop height is 2.6, or if mobile the amount of nav buttons * 2.6
	var navHeight = ( width > 1100 ? 2.6 : buttons * 2.6);
	var pos = 0
	var framerate = setInterval(frame, 10)
	function frame() {
		if(pos > navHeight) {
			clearInterval(framerate)
		} else {
			pos = pos + 0.1
			nav.style.height = pos + 'rem'
		}
	}
}

//onLoad
document.addEventListener("DOMContentLoaded", (e) => {
	var nav = document.getElementsByTagName('nav')[0]
	var navBody = document.querySelector('ul')
	let textBody = document.querySelector('.sectionChild')
	var navButtons = document.getElementsByClassName("navButtons") 
	var navButtonsCount = navBody.childElementCount

	nav.style.height = '0'
	animateNav(nav, navButtonsCount)
	
	navBody.style.opacity = "0"
	navBody.style.display = "none"
	

	let timeOut = (width > 1100 ? 500 : 1100)

	setTimeout(() => {
		navBody.style.display = "block"
		setTimeout(() => { 
			navBody.setAttribute(
				"style", "opacity: 1; transition: 1s;"
			)
		}, timeOut)
	}, 200)

	//Prevent opacity change on mobile
	if(width > 1100) {
	  //Animation
	  textBody.setAttribute(
		"style", "transition: 2s; opacity: 1;"
	  )
	} else {
	   textBody.setAttribute(
		"style", "opacity: 1;"
	  )
	}

	if( window.location.pathname === '/about.html') {
		scalePictures()
		createList()

		mobileWidth.addListener(scalePictures)
	}

    desktopSmallWidth.addListener(() => {
		let liSize =  2.6
      if(desktopSmallWidth.matches) {
		nav.style.height = (liSize * navButtonsCount + "rem")
      } else {
		nav.style.height = "2.6rem" 
      }
    })

})

