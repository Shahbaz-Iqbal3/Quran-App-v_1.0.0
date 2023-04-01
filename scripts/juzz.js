document.addEventListener("DOMContentLoaded", event => {
     // we can move only if we are not in a browser's tab
     isBrowser = matchMedia("(display-mode: browser)").matches;
     if (!isBrowser) {
        window.moveTo(16, 16);
        window.resizeTo(500, window.screen.availHeight);
     }
   });


const container = document.querySelector('.container')
const searchIcon = document.querySelector("#search-icon")
const searchFeild = document.querySelector("#search")
function searchToogle() {
     if (searchIcon.src == (window.location.origin + '/images/Icons/close.svg')) {
          searchIcon.src = '/images/Icons/search.svg'
          searchFeild.style.display = 'none'
          document.querySelector('body').style.height = ''
          searchFeild.value = ''
          search()
     } else {
          document.querySelector('body').style.height = '100vh'
          searchIcon.src = '/images/Icons/close.svg'
          searchFeild.style.display = 'block'
          searchFeild.focus()
     }
}
const search = () => {
     const searchFeild = document.querySelector("#search").value.toUpperCase()
     const surahBoxs = surahIndexBox.querySelectorAll('.juzz-box')
     const surahNames = surahIndexBox.querySelectorAll('.name-en')

     for (let i = 0; i < surahNames.length; i++) {
          let match = surahBoxs[i].querySelectorAll('.name-en')[0]

          if (match) {
               let textValue = match.textContent || match.innerHTML

               if (textValue.toUpperCase().indexOf(searchFeild) > -1) {
                    surahBoxs[i].style.display = ""
               } else {
                    surahBoxs[i].style.display = "none"
               }
          }
     }
}
searchFeild.addEventListener('keyup', search)

const surahIndexBox = document.querySelector("#main-container")

fetch(window.location.origin + "/juzz.json", {
     method: 'GET',
     headers: { 'Accept': 'application/json', },
}).then(response => response.json())
     .then(response => {
          Data = response
          let i;
          for ( i = 0; i < Data.length; i++) {

               surahIndexBox.innerHTML += `
          <div class="juzz-box" data-page="${Data[i].page}">
          <div class="surah-name">
          <span class="name-en">${Data[i].no}. ${Data[i].name}</span>
          <span class="page-no">page # ${Data[i].page}</span>
          </div>
          <div class="surah-info">
          <span class="name-ar">${Data[i].para}</span>
          </div>
               </div>`
          }

          surahBoxs1 = document.querySelectorAll('.juzz-box')
          surahBoxs1.forEach((element , ind) => {
               element.addEventListener('click', ()=>{
                    element.setAttribute('data-pageNum', (Data[ind].page).toString())
                    window.location.href = `${window.location.origin}/pages/quran.html?${Data[ind].page}`
                    console.log(window.location)
               })
          });
     })
