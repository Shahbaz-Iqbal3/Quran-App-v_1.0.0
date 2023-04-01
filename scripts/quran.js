const darkmode = document.querySelector(".q-head-box2");
const darkmodeIcon = document.querySelector("#darkmode");
const canvasColor = document.querySelector("#the-canvas");
const container = document.querySelector(".container");
const container1 = document.querySelector(".q-main-container-quran");


darkmode.addEventListener("click", () => {
  if (darkmodeIcon.src == window.location.origin + "/images/Icons/moon.svg") {
    darkmodeIcon.src = "/images/Icons/light-mode.svg";
    canvas.style.filter = "invert(1)";
    container.style.backgroundColor = "black";
    container1.style.backgroundColor = "black";
    
  } else {
    darkmodeIcon.src = "/images/Icons/moon.svg";
    container.style.backgroundColor = "white";
    container1.style.backgroundColor = "white";
    canvas.style.filter = "invert(0)";
  }
});

/// header click hide

const header = document.querySelector(".q-header");
document.querySelector(".q-container").addEventListener("mousedown", (e) => {
  pageXstart = e.pageX;
});
document.querySelector(".q-container").addEventListener("mouseup", (e) => {
  pageXend = e.pageX;
  if (pageXstart == pageXend) {
    if (header.style.top == "-100px") {
      header.style.top = "0";
    } else {
      header.style.top = "-100px";
    }
  }
});
