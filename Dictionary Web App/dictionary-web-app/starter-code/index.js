const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const searchBtn = document.getElementById("search-button");
let searchBar = document.getElementById("search-bar");
let searchContain = document.getElementById("search-contain");


searchContain.addEventListener('mouseenter', function () {
  searchActive();
})

searchContain.addEventListener('mouseleave', function () {
  searchNotActive();
})

function searchActive () {
  searchContain.classList.add("search-active");
}

function searchNotActive () {
  searchContain.classList.remove("search-active");
}

let searchError = document.getElementById("empty-error");
function showErrorText() {
  searchError.classList.add("show");
  searchError.classList.remove("hide");
  searchContain.classList.add('error-search')
  searchNotActive();
}

function hideErrorText() {
  searchError.classList.add("hide");
  searchError.classList.remove("show");
  searchContain.classList.remove('error-search')
}

hideErrorText();

searchBar.addEventListener('input',function () {
  hideErrorText();
});


searchBar.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    let word = searchBar.value;
    console.log(word);
    if (word === '') {
      showErrorText();
    } else {
      result.innerHTML = "<div class='loader'></div>";
      fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.length > 0) {
            const firstEntry = data[0];
            let htmlContent = '';
            
            if (firstEntry.phonetic) {
              htmlContent += `<div class="pronounce-container">
                <div class="pronounce">
                  <h1>${word}</h1>
                  <p>${firstEntry.phonetic}</p>
                </div>
                <div class="play">`;
                
                let audioUrl = '';
                for (let i = 0; i < firstEntry.phonetics.length; i++) {
                  if (firstEntry.phonetics[i].audio) {
                    audioUrl = firstEntry.phonetics[i].audio;
                    break;
                  }
                }
                
                if (audioUrl) {
                  htmlContent += `<img id = "playSoundBtn" onclick="playSound('${audioUrl}')"
                      src="/dictionary-web-app/starter-code/assets/images/icon-play.svg"
                      alt=""
                    />`;
                }
                  
                htmlContent += `</div>
                </div>`;
              }
              
            
            if (firstEntry.meanings && firstEntry.meanings.length > 0) {
              firstEntry.meanings.forEach((meaning) => {
                if (meaning.partOfSpeech) {
                  htmlContent += `<div class="details">
                    <p class="details-header">${meaning.partOfSpeech}</p>
                    <div class="meaning-container">
                      <p class="meaning-header">Meaning</p>
                      <ul>`;
                  if (meaning.definitions) {
                    meaning.definitions.forEach((definition) => {
                      if (definition.definition) {
                        htmlContent += `<li>${definition.definition}</li>`;
                      }
                    });
                  }
                  htmlContent += `</ul>
                    </div>
                  </div>`;
                }
              });
            }
            
            if (firstEntry.meanings && firstEntry.meanings[0].synonyms) {
              htmlContent += `<div class="synonyms-container">
                                <p class="synonyms">Synonyms</p>
                                <p class="synonyms-example">${
                                  firstEntry.meanings[0].synonyms[0] || `"No synonyms found!"`
                                }</p>
                                </div class="synonyms-container">`;
        
            }
            
            if (firstEntry.sourceUrls) {
              htmlContent += `<div class="source-container">
                                <div class="source">
                                  <p>Source</p>
                                  <a href="${firstEntry.sourceUrls}" target="_blank">${firstEntry.sourceUrls}</a>
                                  <a href="${firstEntry.sourceUrls}" target="_blank">
                                    <img src="/dictionary-web-app/starter-code/assets/images/icon-new-window.svg" alt="new window">
                                  </a>
                                </div>
                              </div>`;
            }
            
            result.innerHTML = htmlContent;
          } else {
            throw new Error('Something is wrong!');
          }
        })
        .catch((error) => {
          console.error('Error fetching or processing data:', error.message);
          result.innerHTML = `<div class="error-content">
            <span class="emoji">😕</span>
            <div class="title">No Definitions Found</div>
            <div class="message">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at a later time or head to
              the web instead.
            </div>
          </div>`;
        });
    }
  }
  //console.log(event);
})


searchBtn.addEventListener("click", function () {
  let word = searchBar.value;
  console.log(word);
  if (word === '') {
    showErrorText();
  } else {
    result.innerHTML = "<div class='loader'></div>";
    fetch(`${url}${word}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.length > 0) {
          const firstEntry = data[0];
          let htmlContent = '';
          
          if (firstEntry.phonetic) {
            htmlContent += `<div class="pronounce-container">
              <div class="pronounce">
                <h1>${word}</h1>
                <p>${firstEntry.phonetic}</p>
              </div>
              <div class="play">`;
              
              let audioUrl = '';
              for (let i = 0; i < firstEntry.phonetics.length; i++) {
                if (firstEntry.phonetics[i].audio) {
                  audioUrl = firstEntry.phonetics[i].audio;
                  break;
                }
              }
              
              if (audioUrl) {
                htmlContent += `<img id = "playSoundBtn" onclick="playSound('${audioUrl}')"
                    src="/dictionary-web-app/starter-code/assets/images/icon-play.svg"
                    alt=""
                  />`;
              }
                
              htmlContent += `</div>
              </div>`;
            }
            
          
          if (firstEntry.meanings && firstEntry.meanings.length > 0) {
            firstEntry.meanings.forEach((meaning) => {
              if (meaning.partOfSpeech) {
                htmlContent += `<div class="details">
                  <p class="details-header">${meaning.partOfSpeech}</p>
                  <div class="meaning-container">
                    <p class="meaning-header">Meaning</p>
                    <ul>`;
                if (meaning.definitions) {
                  meaning.definitions.forEach((definition) => {
                    if (definition.definition) {
                      htmlContent += `<li>${definition.definition}</li>`;
                    }
                  });
                }
                htmlContent += `</ul>
                  </div>
                </div>`;
              }
            });
          }
          
          if (firstEntry.meanings && firstEntry.meanings[0].synonyms) {
            htmlContent += `<div class="synonyms-container">
                              <p class="synonyms">Synonyms</p>
                              <p class="synonyms-example">${
                                firstEntry.meanings[0].synonyms[0] || `"No synonyms found!"`
                              }</p>
                              </div class="synonyms-container">`;
      
          }
          
          if (firstEntry.sourceUrls) {
            htmlContent += `<div class="source-container">
                              <div class="source">
                                <p>Source</p>
                                <a href="${firstEntry.sourceUrls}" target="_blank">${firstEntry.sourceUrls}</a>
                                <a href="${firstEntry.sourceUrls}" target="_blank">
                                  <img src="/dictionary-web-app/starter-code/assets/images/icon-new-window.svg" alt="new window">
                                </a>
                              </div>
                            </div>`;
          }
          
          result.innerHTML = htmlContent;
        } else {
          throw new Error('Something is wrong!');
        }
      })
      .catch((error) => {
        console.error('Error fetching or processing data:', error.message);
        result.innerHTML = `<div class="error-content">
          <span class="emoji">😕</span>
          <div class="title">No Definitions Found</div>
          <div class="message">
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at a later time or head to
            the web instead.
          </div>
        </div>`;
      });
  }
});



function playSound(audioUrl) {
  const audio = new Audio(audioUrl);
  console.log(audioUrl)
  audio.play();
  changeImg ();
}

function changeImg () {
  let playSoundBtn = document.getElementById('playSoundBtn');
  playSoundBtn.src = '/dictionary-web-app/starter-code/assets/images/sound-icon.jpg';
  //console.log('image changed');
  setTimeout(revertImg, 3000);
}

function revertImg () {
  let playSoundBtn = document.getElementById('playSoundBtn');
  playSoundBtn.src = '/dictionary-web-app/starter-code/assets/images/icon-play.svg';
}

let darkModeBtn = document.getElementById("dark-mode");
let fontChangerBtn = document.getElementById("font-changer");
let body = document.getElementById("body");
let dropdownContent = document.querySelector(".dropdown-content");

hideDropdown();

darkModeBtn.addEventListener("click", function () {
  darkModeBtn.classList.toggle("active");
  body.classList.toggle("dark-mode");
});

function hideDropdown () {
  dropdownContent.classList.add('hide');
  dropdownContent.classList.remove('show');
}

function showDropdown () {
  dropdownContent.classList.add('show');
  dropdownContent.classList.remove('hide');
}


fontChangerBtn.addEventListener("click", function () {
  if(dropdownContent.classList.contains('hide')){
    showDropdown();
  }
  else {
    hideDropdown();
  }
});

let fontOptions = document.querySelectorAll(".font-option");


fontOptions.forEach(function(option) {
  option.addEventListener("click", function(event) {
    event.preventDefault();
    let selectedFont = this.getAttribute("data-font");
    document.body.style.fontFamily = selectedFont;
    searchBar.style.fontFamily = selectedFont;
    dropdownContent.classList.remove("show");
  });
});

window.addEventListener("click", function(event) {
  if (!event.target.closest('.font-dropdown')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        hideDropdown();
      }
    }
  }
})


const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

if (prefersDarkMode || localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeBtn.classList.toggle("active");
}
