// Makes navigation bar automatically know which tab/button
// should be considered the active link without having to specify class/id
// Source: https://cssnewbie.com/intelligent-navigation/
// filters all the anchor tags via nav id, cycles through every anchor,
// compares the href of the tag with the page currently on (document.location)
// and if a match, sets class 'active' on the anchor tag.
function setActive() {
  aObj = document.getElementById('nav').getElementByTagName('a');
  for(i=0;i<Obj.length;i++) {
    if(document.location.href.indexOf(aObj[i].hred)>=0) {
      aObj[i].className='active';
    }
  }
}

window.onload = setActive;
