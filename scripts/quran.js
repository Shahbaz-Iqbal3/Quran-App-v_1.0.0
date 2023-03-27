const darkmode = document.querySelector(".q-head-box2");
const darkmodeIcon = document.querySelector("#darkmode");
const canvasColor = document.querySelector('#the-canvas')
const container = document.querySelector('.container')
const container1 = document.querySelector('.q-main-container-quran')
const nextPrevBtns = document.querySelectorAll('.q-btn')

darkmode.addEventListener("click", () => {
  if (darkmodeIcon.src == window.location.origin + "/images/Icons/moon.svg") {
    darkmodeIcon.src = "/images/Icons/light-mode.svg";
    canvas.style.filter = 'invert(1)'
    container.style.backgroundColor  = 'black'
    container1.style.backgroundColor  = 'black'
    nextPrevBtns[0].style.filter = 'invert(1)'
    nextPrevBtns[1].style.filter = 'invert(1)'
} else {
     darkmodeIcon.src = "/images/Icons/moon.svg";
     container.style.backgroundColor  = 'white'
     container1.style.backgroundColor  = 'white'
     nextPrevBtns[0].style.filter = 'invert(0)'
     nextPrevBtns[1].style.filter = 'invert(0)'
     canvas.style.filter = 'invert(0)'

  }
});

/// header click hide

const header = document.querySelector('.q-header')
const Qcontainer = document.querySelector('.q-container')
Qcontainer.addEventListener('click', ()=>{
     if (header.style.top == '-80px') {
          header.style.top = '0'
     }else{
          header.style.top = '-80px'
     }
})

