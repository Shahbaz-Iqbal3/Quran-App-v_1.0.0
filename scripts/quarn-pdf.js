
const Qurancontainer = document.querySelector('.q-container')


window.addEventListener('load', ()=> {
     document.querySelector('.loader').style.display = 'none'
     Qurancontainer.style.display = 'block'
})



///// If absolute URL from the remote server is provided, configure the CORS
//// header on that server.
var url = '/quran.pdf';

/// Loaded via <script> tag, cre  ate shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

/// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
 
 
var pdfDoc = null,
     pageNum = parseInt(window.location.search.substring(1)) || 1,
     pageRendering = false,
     pageNumPending = null,
     scale = 0.8    ,
     outputScale = window.devicePixelRatio || 1,
canvas = document.getElementById('the-canvas'),
     ctx = canvas.getContext('2d');

     /**
      * Get page info from document, resize canvas  accordingly, and render page.
      * @param num Page number.
     */
    function renderPage(num) {
         pageRendering = true;
         // Using promise to fetch the page
         pdfDoc.getPage(num).then(function (page) {
          var desiredWidth = document.querySelector(".q-pdf-render").clientWidth;
          var viewport = page.getViewport({ scale: 1, });
          var scale = desiredWidth / viewport.width;
          var viewport = page.getViewport({ scale: scale, });  


         
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + "px";
          canvas.style.height = Math.floor(viewport.height) + "px";


          var transform = outputScale !== 1
               ? [outputScale, 0, 0, outputScale, 0, 0]
               : null;

          var renderContext = {
               canvasContext: ctx,
               transform: transform,
               viewport: viewport
          };

          // Render PDF page into canvas context

          var renderTask = page.render(renderContext);

          // Wait for rendering to finish
          renderTask.promise.then(function () {
               pageRendering = false;
               if (pageNumPending !== null) {
                    // New page rendering is pending
                    renderPage(pageNumPending);
                    pageNumPending = null;
               }
          });
     });

     // Update page counters
     document.getElementById('page_num').textContent = num;
     localStorage.removeItem("CurentPageNum")
     window.localStorage.setItem("CurentPageNum" ,num.toString())

     // Update surah name 
     srahName = document.querySelector("#suraName")
     fetch(window.location.origin + "/surah.json", {
          method: "GET",
          headers: { Accept: "application/json" },
        })
          .then((response) => response.json())
          .then((response) => {
            Data = response;
        
            for (let index = 1; index < 115; index++) {
              if (num == parseInt(Data[index].page)) {
               srahName.textContent = Data[index].nameofsurahinen;
              } else if (
               num > parseInt(Data[index].page) &&
               num < parseInt(Data[index + 1].page)
              ) {
                srahName.textContent = Data[index].nameofsurahinen;
              }
            }
          });
}

window.addEventListener("resize", (e)=>{
     renderPage(pageNum)
});

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
     if (pageRendering) {
          pageNumPending = num;
     } else {
          renderPage(num);
     }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
     if (pageNum <= 1) {
          return;
     }
     pageNum--;
     queueRenderPage(pageNum);
}


/**
 * Displays next page.
 */
function onNextPage() {
     if (pageNum >= pdfDoc.numPages) {
          return;
     }
     pageNum++;
     queueRenderPage(pageNum);
}


// adding touch gesture
let pageXend = 0 
let pageXstart = 0 
document.querySelector('.q-container').addEventListener('touchstart',e =>{
  pageXstart =  e.touches[0].pageX
})
document.querySelector('.q-container').addEventListener('touchend',e =>{
  pageXend = e.changedTouches[0].pageX
  if(pageXstart > pageXend){
    onPrevPage()
  }
   if(pageXstart < pageXend){
    onNextPage()
  }
})


/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
     pdfDoc = pdfDoc_;
     document.getElementById('page_count').textContent = pdfDoc.numPages;

     // Initial/first page rendering
     renderPage(pageNum);
}).catch(function (error) {
     console.error('Quran.pdf could not be fetched', error);
     document.getElementById('errormsg').style.display = 'block'
})