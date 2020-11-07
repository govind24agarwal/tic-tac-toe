const gameBoard = (function () {
  const gameArray = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];
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
  function getGameArray() {
    const arr = gameArray;
    return arr;
  }
  return { playerWon };
})();
const player = function (name, sign) {
  name;
  sign;
  return { name, sign };
};
let player1 = player("Govind", "X");
let player2 = player("Computer", "O");
console.log(gameBoard.playerWon(player1));
