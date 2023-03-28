if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  navigator.serviceWorker.register('/generate-sw.js').then(console.log('registerd'));
  });
}
document.addEventListener("DOMContentLoaded", event => {
  // we can move only if we are not in a browser's tab
  isBrowser = matchMedia("(display-mode: browser)").matches;
  if (!isBrowser) {
     window.moveTo(16, 16);
     window.resizeTo(500, window.screen.availHeight);
  }
});
console.log(window.screen.availHeight);

const menu = document.querySelector(".menu");
const menuBg = document.querySelector(".menu-bg");
toggleMenu = () => {
  menu.classList.toggle("active");
  menuBg.classList.toggle("active");
};
months = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'aban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Hmonths(Mnum) {
  Mnum = months[Mnum - 1];
  return Mnum;
}
m = Hmonths(8);
console.log(m);
const date = new Date().getDay();

todayElement = document.getElementById("h-today");
todayElement.innerHTML = `${days[date]}, ${HijriJS.today().day} ${Hmonths(
  HijriJS.today().month
)} ${HijriJS.today().year} ھ`;

// Resume Function

const ResumeBtn = document.querySelector(".resume-btn");
const ResumeSurah = document.querySelector(".resume-surah");
const ResumeJuzz = document.querySelector(".resume-juzz");
curentPageNum = window.localStorage.getItem("CurentPageNum");

fetch(window.location.origin + "/surah.json", {
  method: "GET",
  headers: { Accept: "application/json" },
})
  .then((response) => response.json())
  .then((response) => {
    Data = response;

    for (let index = 1; index < 115; index++) {
      if (parseInt(curentPageNum) == parseInt(Data[index].page)) {
        ResumeSurah.textContent = Data[index].nameofsurahinar;
        ResumeJuzz.textContent = `Juzz - ${Data[index].para}`;
      } else if (
        parseInt(curentPageNum) > parseInt(Data[index].page) &&
        parseInt(curentPageNum) < parseInt(Data[index + 1].page)
      ) {
        ResumeSurah.textContent = Data[index].nameofsurahinar;
        ResumeJuzz.textContent = `Juzz - ${Data[index].para}`;
      }
    }
  });

ResumeBtn.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/pages/quran.html?${curentPageNum}`;
});

// Goto Function

const Goto = document.querySelector(".goto");
const GotoBox = document.querySelector(".goto-box");
const GotoBg = document.querySelector(".goto-bg");
const closeBtn = document.querySelector("#closeBtn");
const GotoBtn = document.querySelector("#gotoBtn");
const GotoInput = document.querySelector("#goto-input");

Goto.addEventListener("click", () => {
  GotoBox.classList.add("active");
  GotoBg.classList.add("active");
  GotoInput.focus();
  GotoInput.value = "";
});
closeBtn.addEventListener("click", () => {
  GotoBox.classList.remove("active");
  GotoBg.classList.remove("active");
  
});
GotoBtn.addEventListener("click", goto);
GotoInput.addEventListener("keyup", (e)=>{
     if (e.key == 'Enter') {
          goto()
     }
});
function goto() {
  if (GotoInput.value == "" || GotoInput.value < 0 || GotoInput.value > 548) {
    GotoInput.value = "";
    GotoInput.focus();
    invalidMsg = document.createElement("span");
    invalidMsg.innerText = "Enter a Valid Number";
    invalidMsg.classList.add("invalidMsg");
    GotoBox.appendChild(invalidMsg);
    console.log(invalidMsg);
  } else {
    window.location.href = `${window.location.origin}/pages/quran.html?${GotoInput.value}`;
  }
  
}
