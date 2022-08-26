  // Array of Words
  const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
  ]
  // Setting Levels 
  const lvls = {
    "Easy" : 6,
    "Normal" : 4,
    "Hard" : 2
  }

  // Add a new level from user
  lvls[`${window.localStorage.getItem("new level name")}`] = Number(window.localStorage.getItem("new level seconds"));

  // Filter words length for Lvls 
  const lvlEasy = words.filter(el => {
    return el.length <= 4
  })

  const lvlNormal = words.filter(el => {
    return el.length >= 5 && el.length <= 7
  })

  const lvlHard = words.filter(el => {
    return el.length >= 7
  })

  const newLvl = words.filter( el => {
    return el.length >= window.localStorage.getItem("new level words length");
  })
  // put all length's in array
  const lvlLength = [lvlEasy.length, lvlNormal.length, lvlHard.length, newLvl.length]

  // Catch Selectors 
  let selectLvl = document.querySelector(".select-lvl");
  let startButton = document.querySelector(".start");
  let lvlNameSpan = document.querySelector(".message .lvl");
  let secondsSpan = document.querySelector(".message .seconds");
  let theWord = document.querySelector(".the-word");
  let upcomingWords = document.querySelector(".upcoming-words");
  let control = document.querySelector(".control");
  let input = document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span");
  let score = document.querySelector(".score");
  let scoreGot = document.querySelector(".score .total");
  let got = document.querySelector(".score .got");
  let finish = document.querySelector(".finish");
  let description = document.querySelector(".description")
  let lvlDescroption = document.querySelector(".description .level div");
  let secDescroption = document.querySelector(".description .sec div");
  let lengthDescroption = document.querySelector(".description .words-length div");
  let addNewLvl = document.querySelector(".add-new-lvl");
  let form = document.querySelector(".form");
  let newLevelEnterName = document.querySelector(".enter-name");
  let newLevelEnterSeconds = document.querySelector(".enter-seconds");
  let newLevelEnterLength =document.querySelector(".enter-length");
  let btnCreateNewLevel = document.querySelector(".create-new-level");



  // Default Level
  selectLvl.addEventListener("click", (e) => {
    defaultLevelName = e.target.value;
    defaultLevelSeconds = lvls[defaultLevelName];
    // Setting Level Name + Seconds + Score
    window.localStorage.setItem("lvl", e.target.value);
    settingLvl();
  })
  let defaultLevelName = window.localStorage.getItem("lvl");
  let defaultLevelSeconds = lvls[window.localStorage.getItem("lvl")];

  // filter the array
  function resultLvl () {
    let result;
    if (selectLvl.value === "Hard") {
      result = lvlHard
    } else if (selectLvl.value === "Normal") {
      result = lvlNormal
    } else if (selectLvl.value === "Easy") {
      result = lvlEasy
    } else {
      result = newLvl
    }
    return result
  }

  // Setting Level Name + Seconds + Score
  function settingLvl() {
    lvlNameSpan.innerHTML = defaultLevelName;
    timeLeftSpan.innerHTML = lvls[window.localStorage.getItem("lvl")];
    secondsSpan.innerHTML = lvls[window.localStorage.getItem("lvl")];
    scoreGot.innerHTML = resultLvl().length;
    if (window.localStorage.getItem("lvl") === null) {
      defaultLevelName = lvls["Easy"];
    } 
  }
  settingLvl();
  // Disable Paste Event 
  input.onpaste = function () {
    return false;
  }

  // Start Game 
  startButton.onclick = function () {
    this.remove();
    input.focus();
    selectLvl.remove();
    description.remove();
    addNewLvl.remove();
    form.remove();
    input.style.display = "block";
    upcomingWords.style.display = "flex";
    control.style.display = "flex"; 
    // Generate Word Function
    genWords();
  }

  // Get a Random Word + Delete It from array + reset Input
  function getWord() {
  // Random Word From Array
    let randomWords = resultLvl()[Math.floor(Math.random() * resultLvl().length)];
    // Get Word Index 
    let index = resultLvl().indexOf(randomWords);
    // Remove Word From Array 
    resultLvl().splice(index, 1);
    // Show The Random Word 
    theWord.innerHTML = randomWords;
    // Empty Upcoming Words 
    upcomingWords.innerHTML = '';
  }

  // Genarate Words from new lvl array 
  function genWords() {
    getWord();
    // Generate Words 
    for (let i = 0; i < resultLvl().length; i++) {
      // Create New Div 
      let div = document.createElement("div");
      let text = document.createTextNode(resultLvl()[i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
  }

  // Set a Date 
  let day = new Intl.DateTimeFormat('en-us', {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });

  let hour = new Intl.DateTimeFormat('en-us', {
    hour:"numeric",
    minute: "numeric"
  });
  let data = new Date();

  function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(()=> {
      timeLeftSpan.innerHTML--;
      if(timeLeftSpan.innerHTML === "0") {
        // Stop Timer 
        clearInterval(start);
        // Compare Words 
        if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
          // Empty Input Field 
          input.value = "";
          // Increase Score 
          got.innerHTML++;
          if (resultLvl().length > 0) {
            // Call Start Play Function 
            genWords();
          } else {
            let span = document.createElement("span");
            span.className = "good";
            let spanText = document.createTextNode("Congratulations");
            span.appendChild(spanText);
            finish.appendChild(span);
            upcomingWords.remove();
            window.localStorage.setItem("last score", ` The Last ${score.textContent} at ${day.format(data)} ${hour.format(data)}`);
          }
        } else {
          let span = document.createElement("span");
          span.className = "bad"
          let textSpan = document.createTextNode("Game Over");
          span.appendChild(textSpan);
          finish.appendChild(span);
        }
      }
    }, 1000);
  }

  let lvlSize = Object.keys(lvls)
  
  let i = 0;
  // Make a Description To Explain Levels
  for (const key in lvls) {
    child = document.createElement("div");
    child.className = "child"
    // Set Lvl Name In Description
    let lvlName = document.createElement("div");
    let textName = document.createTextNode(key);
    lvlName.appendChild(textName)
    child.appendChild(lvlName);
    // Set Lvl Seconds In Description
    let secName = document.createElement("div");
    let secSpan = document.createElement("span");
    let textSec = document.createTextNode(`${lvls[key]} Seconds`);
    secSpan.appendChild(textSec);
    secName.appendChild(secSpan);
    child.appendChild(secName);
    description.appendChild(child);
    let wordLengthParent = document.createElement("div");
    let wordLengthNumber = document.createTextNode(`${lvlLength[i]} Words`);
    wordLengthParent.appendChild(wordLengthNumber);
    child.appendChild(wordLengthParent);
    description.appendChild(child);
    i++;
  }

  // alert post the last score
  if (window.localStorage.getItem("last score")) {
    alert(window.localStorage.getItem("last score"));
  }

  // Add New Level Button 
  addNewLvl.onclick = () => {
    form.style.display = "block";
  }

  // appind new option in select 
  let appendNewOption = () => {
    defaultLevelSeconds = window.localStorage.getItem("new level seconds");
    let newOption = document.createElement("option");
    let optionText = document.createTextNode(window.localStorage.getItem("new level name"));
    newOption.appendChild(optionText);
    selectLvl.appendChild(newOption);
  }
  appendNewOption();

  btnCreateNewLevel.onclick = () => {
    if (newLevelEnterName.value !== "" && newLevelEnterSeconds.value !== "" && newLevelEnterLength.value !== "") {
      window.localStorage.setItem("new level name", newLevelEnterName.value);
      window.localStorage.setItem("new level seconds", newLevelEnterSeconds.value);
      window.localStorage.setItem("new level words length", newLevelEnterLength.value);
      appendNewOption();
      settingLvl();
      form.remove();
    }else {
      console.log("no data to create");
    }
  }

  settingLvl();
  // Set The Select Lvl from local Storage
  selectLvl.value = window.localStorage.getItem("lvl");
