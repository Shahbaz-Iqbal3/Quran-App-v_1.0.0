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
          searchIcon.src = '/images/Icons/close.svg'
          searchFeild.style.display = 'block'
          document.querySelector('body').style.height = '100vh'
          searchFeild.focus()
     }
}
const search = () => {
     const searchFeild = document.querySelector("#search").value.toUpperCase()
     const surahBoxs = surahIndexBox.querySelectorAll('.surah-box')
     const surahNames = surahIndexBox.querySelectorAll('.name-en')
     
     for (let i = 0; i < surahNames.length; i++) {
          let match = surahBoxs[i].querySelectorAll('.name-en')[0]

          if(match){
               let textValue =  match.textContent || match.innerHTML

               if (textValue.toUpperCase().indexOf(searchFeild) > -1)  {
                    surahBoxs[i].style.display = ""
               }else{
                    surahBoxs[i].style.display = "none"
               }
          }
     }
}
searchFeild.addEventListener('keyup', search)

const surahIndexBox = document.querySelector(".main-container")

fetch(window.location.origin + "/surah.json", {
     method: 'GET',
     headers: { 'Accept': 'application/json', },
}).then(response => response.json())
     .then(response => {
          Data = response
          for (let i = 1; i < 115; i++) {

               surahIndexBox.innerHTML += `
               <div class="surah-box">
               <div class="surah-name">
               <span class="name-en">${Data[i].surano}. ${Data[i].nameofsurahinen}</span>
               <span class="name-ar">${Data[i].nameofsurahinar}</span>
               </div>
               <div class="surah-info">
               <div class="info-btn">
               <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11v5m9-4a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#b4b4b4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7.5" r="1" fill="#b4b4b4"/></svg>
               </div>
               <div class="read-btn">Read</div>
               </div>
               </div>`
          }
          surahInfo(Data)
          surahBoxs1 = document.querySelectorAll('.read-btn')
          surahBoxs1.forEach((element , ind) => {
               element.addEventListener('click', ()=>{
                    window.location.href = `${window.location.origin}/pages/quran.html?${Data[ind+1].page}`
                    console.log(window.location)
               })
          });
     })

const surahInfoBg = document.querySelector('.surah-info-bg')
const surahInfoBox = document.querySelector('.surah-info-box'),
     body = document.querySelector("body")


function surahInfo(data) {
     const infoBtn = document.querySelectorAll(".info-btn")
     infoBtn.forEach((e, i) => {
          i++
          e.addEventListener('click', () => {

               surahInfoBg.classList.toggle('active')
               surahInfoBox.classList.toggle('active')
               body.style.overflow = 'hidden'
               surahInfoBox.innerHTML = `
               <h2>Surah info</h2>
               <div class="about-surah">
                    <ul>
                         <li><span>Surah No.</span><span>${data[i].surano}</span></li>
                         <li><span>Surah Name</span><span>${data[i].nameofsurahinen}</span></li>
                         <li><span style="font-family: 'Poppins',sans-serif;">Surah Name</span>
                         <span>${data[i].nameofsurahinar}</span></li>
                         <li><span>Verses</span><span>${data[i].verses}</span></li>
                         <li><span>Rakus</span><span>${data[i].rakus}</span></li>
                         <li><span>Para</span><span>${data[i].para}</span></li>
                         <li><span>Revealed In</span><span>${data[i].maqamenazil}</span></li>                        
                         <li><span>Page #</span><span>${data[i].page}</span></li>                        
                    </ul>                    
               </div>
               <div class="close-btn">Close</div>
               `;
               const infoCloseBtn = document.querySelector(".close-btn")

               infoCloseBtn.addEventListener("click", () => {
                    surahInfoBg.classList.toggle('active')
                    surahInfoBox.classList.toggle('active')
                    body.style.overflow = 'scroll'
               })
          })
     });

}
