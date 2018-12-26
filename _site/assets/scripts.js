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

//onLoad
document.addEventListener("DOMContentLoaded", (e) => {

let textBody = document.querySelector('.sectionChild')


//Prevent mobile animation
if(width > 680) {
  //Animation
  textBody.setAttribute(
    "style", "transition: 2s; opacity: 1; border-radius: 5px;"
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

  //prevent cropping issue when more than two li items are on the nav bar
  if (document.querySelector('ul').childElementCount === 3) {
    let nav = document.getElementsByTagName('nav')[0]

    if(width < 1100) {
      nav.style.height = "85px"
    }

    desktopSmallWidth.addListener(() => {
      if(desktopSmallWidth.matches) {
        nav.style.height = "85px"
      } else {
       nav.style.height = "30px" 
      }
    })
  }


//    let sectionStyle = (window.getComputedStyle(section))
//    let sectionHeight = sectionStyle.getPropertyValue('height')
})

