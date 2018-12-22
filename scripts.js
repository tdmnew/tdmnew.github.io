var width = document.body.clientWidth;
var mobileWidth = window.matchMedia('(max-width: 400px)')
var section = document.getElementsByTagName('section')[0]
let lang = document.querySelector('.languagePictures')
let langList = document.createElement('div')

langList.style.textAlign = 'center'


section.insertBefore(langList, lang); 

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
    lang.style.display = 'none'
    langList.style.display = 'block'
  } else {
    lang.style.display = 'block'
    langList.style.display = 'none'
  }
}

scalePictures()
createList()

mobileWidth.addListener(scalePictures)

