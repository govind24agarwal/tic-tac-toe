const gameBoard = (function () {
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  function getGameArray() {
    const arr = gameArray;
    return arr;
  }
  function setMove(boxNo, sign) {
    gameArray[boxNo] = sign;
  }
  function resetArray() {
    gameArray = ["", "", "", "", "", "", "", "", ""];
  }
  return { getGameArray, setMove, resetArray };
})();

const player = function (name, sign) {
  name;
  sign;
  return { name, sign };
};

const gamePlay = (function () {
  let gameArray = gameBoard.getGameArray();
  //Checking if player Won
  function checkHorizontal(player) {
    let score = 0;
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 3; j++) {
        if (gameArray[i + j] == player.sign) score += 1;
      }
      if (score == 3) return true;
      else score = 0;
    }
  }
  function checkVertical(player) {
    let score = 0;
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 9; j += 3) {
        if (gameArray[i + j] == player.sign) score += 1;
      }
      if (score == 3) return true;
      else score = 0;
    }
  }
  function checkDiagonal(player) {
    let score = 0;
    for (let i = 0; i < 9; i += 4) {
      if (gameArray[i] == player.sign) score += 1;
      if (score == 3) return true;
    }
    score = 0;
    for (let i = 2; i <= 6; i += 2) {
      if (gameArray[i] == player.sign) score += 1;
      if (score == 3) return true;
    }
  }
  function playerWon(player) {
    let sign = player.sign;
    if (checkHorizontal(player)) return true;
    if (checkVertical(player)) return true;
    if (checkDiagonal(player)) return true;
    return false;
  }
  function tie() {
    if (gameArray.includes("")) return false;
    else return true;
  }
  //Functions related to changing gameArray and displaying it
  function updateBoard() {
    gameArray = gameBoard.getGameArray();
  }
  function displayGame(boxes) {
    boxes.forEach((box) => {
      box.textContent = gameArray[box.dataset.box];
    });
  }
  function setMove(boxNo, sign) {
    gameBoard.setMove(boxNo, sign);
    updateBoard();
  }
  //Functions related to actual game play

  function changePlayer(currPlayer, player1, player2) {
    if (currPlayer == player1) currPlayer = player2;
    else currPlayer = player1;
    return currPlayer;
  }
  function play(boxes, player1, player2) {
    form.classList.add("submitted");
    let currPlayer = player1;
    displayGame(boxes);
    boxes.forEach((box) => {
      box.addEventListener("click", (e) => {
        setMove(Number(box.dataset.box), currPlayer.sign);
        if (playerWon(currPlayer)) {
          displayMsg.textContent = currPlayer.name + " Won";
          form.classList.remove("submitted");
          return;
        }
        if (tie()) {
          displayMsg.textContent = "TIE";
          form.classList.remove("submitted");
          return;
        }
        currPlayer = changePlayer(currPlayer, player1, player2);
        displayGame(boxes);
      });
    });
  }
  function newGame(boxes, player1, player2) {
    form.classList.remove("submitted");
    gameBoard.resetArray();
    updateBoard();
    play(boxes, player1, player2);
  }
  return { play, newGame };
})();

const submitBtn = document.querySelector("input[value='submit']");
const form = document.querySelector(".screen");
const boxes = document.querySelectorAll(".box");
const displayMsg = document.querySelector(".screen h2");
let player1 = player("User1", "X");
let player2 = player("User2", "O");
submitBtn.addEventListener("click", (e) => {
  form.classList.add("submitted");
  let player1Name = document.querySelector("input[name='player1-name']");
  let player2Name = document.querySelector("input[name='player2-name']");
  player1 = player(player1Name.value, "X");
  player2 = player(player2Name.value, "O");
  gamePlay.newGame(boxes, player1, player2);
});
const restBtn = document.querySelector(".reset-bttn");
restBtn.addEventListener("click", (e) => {
  displayMsg.textContent = "";
  form.classList.remove("submitted");
});
