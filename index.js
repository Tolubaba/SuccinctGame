let score = 0;
let teamScores = {
  blue: 0,
  red: 0,
  green: 0,
  yellow: 0
}

let localScore = localStorage.getItem("rps-fm");
if (localScore) {
  score = JSON.parse(localScore);
}
document.querySelector("#score").innerHTML = score;

window.addEventListener("resize", () => {
  let widthPara = document.querySelector(".window-width");
  widthPara.textContent = window.innerWidth;
})

async function setChoice(element) {
  //switches the selection screen for the results screen
  document.querySelector(".body-cont-1").style.display = "none";
  document.querySelector(".body-cont-2").style.display = "flex";

  addImage(element.id, ".player", "pl"); //displays the users selection
  await sleep(100);

  let house = document.querySelector(".house");
  house.id = ""; //removes the blue circle that shows for the house selection

  let choice = ["rock", "paper", "scissors"];
  let housechoice = choice[Math.trunc(Math.random() * 3)]; //make a random house selection
  addImage(housechoice, ".house", "ho"); //display the house selection

  //displayes the results div
  document.querySelector(".results").style.display = "flex";

  //decides whether you won, lost or had a draw.
  if (element.id === housechoice) {
    document.querySelector(".result").innerHTML = "YOU DRAW";
  } else {
    switch (element.id) {
      case "paper":
        if (housechoice === "rock") {
          document.querySelector(".result").innerHTML = "YOU WIN";
          win();
        } else {
          document.querySelector(".result").innerHTML = "YOU LOSE";
          lose();
        }
        break;

      case "rock":
        if (housechoice === "scissors") {
          document.querySelector(".result").innerHTML = "YOU WIN";
          win();
        } else {
          document.querySelector(".result").innerHTML = "YOU LOSE";
          lose();
        }
        break;

      case "scissors":
        if (housechoice === "paper") {
          document.querySelector(".result").innerHTML = "YOU WIN";
          win();
        } else {
          document.querySelector(".result").innerHTML = "YOU LOSE";
          lose();
        }
        break;

      default:
        break;
    }
  }
}

function addImage(id, player, name) {
  let choice = [];

  //decides which images to add based on player and house choices
  switch (id) {
    case "paper":
      choice = ["images/icon-paper.svg", "paper-pic"];
      break;

    case "scissors":
      choice = ["images/icon-scissors.svg", "scissors-pic"];
      break;

    case "rock":
      choice = ["images/icon-rock.svg", "rock-pics"];
      break;

    default:
      break;
  }

  //adds the classes necessary for styling the image. Also adds the image attributes
  document.querySelector(player).classList.add(id);
  let image = document.createElement("img");
  image.src = choice[0];
  image.alt = choice[1];
  image.id = name;
  image.classList.add("pics");

  document.querySelector(player).appendChild(image);
}

function reset() {
  //swaps the screen to the selection screen
  document.querySelector(".body-cont-1").style.display = "block";
  document.querySelector(".body-cont-2").style.display = "none";

  //removes the attached image
  document.querySelector(".player").removeChild(document.getElementById("pl"));
  document.querySelector(".house").removeChild(document.getElementById("ho"));

  //removes the class added for styling
  document
    .querySelector(".player")
    .classList.remove("rock", "paper", "scissors");
  document
    .querySelector(".house")
    .classList.remove("rock", "paper", "scissors");

  document.querySelector(".results").style.display = "none"; //removes the results div
  document.querySelector(".house").id = "small-circle"; //displays the small circle for house selection

  //remove halo
  document.querySelector(".halo-cont-1").style.display = "none";
  document.querySelector(".halo-cont-2").style.display = "none";
}

function win() {
  //updates the score
  document.querySelector("#score").innerHTML = score += 1;

  //show halo
  let x = window.matchMedia("(min-width: 510px)");
  if (x.matches) {
    document.querySelector(".halo-cont-1").style.display = "block";
  }

  //stores updated score in local storage
  localStorage.setItem("rps-fm", JSON.stringify(score));
}

function lose() {
  //updates the score
  score = score - 1 < 0 ? 0 : score - 1;
  document.querySelector("#score").innerHTML = score;

  //show halo
  let x = window.matchMedia("(min-width: 510px)");
  if (x.matches) {
    document.querySelector(".halo-cont-2").style.display = "block";
  }

  //stores updated score in local storage
  localStorage.setItem("rps-fm", JSON.stringify(score));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showRules() {
  document.querySelector(".rules-main-cont").style.display = "block";
}

function hideRules() {
  document.querySelector(".rules-main-cont").style.display = "none";
}

function setTeam(team){
  //Change the team to the selected team
  let selectElement = document.querySelector("select");
  selectElement.value = team;

  //Close the selection box
  let selectionBox = document.querySelector(".choose-team-cont");
  selectionBox.style.display = "none"; 
}

function closeLeaderboard(){
  let leaderboardElement = document.querySelector(".leaderboard-cont");
  leaderboardElement.style.display = "none";
}

function openLeaderboard(){
  let leaderboardElement = document.querySelector(".leaderboard-cont");
  leaderboardElement.style.display = "flex";

  document.querySelector(".red-score").textContent = teamScores.red;
  document.querySelector(".green-score").textContent = teamScores.green;
  document.querySelector(".blue-score").textContent = teamScores.blue;
  document.querySelector(".yellow-score").textContent = teamScores.yellow;
}

function openLockIn(){
  let lockInElement = document.querySelector(".lock-in-cont");
  lockInElement.style.display = "flex";

  document.querySelector(".current-score").textContent = score;
  document.querySelector(".current-team").textContent = document.querySelector("select").value;
}

function closeLockIn(){
  document.querySelector('.lock-in-cont').style.display = 'none';
}

function lockInScore(){
  let team = document.querySelector("select").value;

  teamScores[team] = teamScores[team] + score;
  score = 0;
  document.querySelector("#score").innerHTML = score;

  //stores updated score in local storage
  localStorage.setItem("rps-fm", JSON.stringify(score));

  closeLockIn();
}
