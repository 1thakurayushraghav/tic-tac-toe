let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let mgsContainer = document.querySelector(".mgs-container");
let msg = document.querySelector("#msg");

let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");
let draws = document.querySelector("#draws");

let turnO = true; // Player O starts
let count = 0; // Track filled boxes

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  mgsContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#0984e3"; // Blue for O
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#d63031"; // Red for X
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerHTML = `🎉 Congratulations! <br> Winner is <strong>${winner}</strong>`;
  mgsContainer.classList.remove("hide");
  disableBoxes();

  if (winner === "O") {
    scoreO.innerText = parseInt(scoreO.innerText) + 1;
  } else {
    scoreX.innerText = parseInt(scoreX.innerText) + 1;
  }
};

const gameDraw = () => {
  msg.innerHTML = "🤝 It's a Draw!";
  mgsContainer.classList.remove("hide");
  draws.innerText = parseInt(draws.innerText) + 1;
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }git 
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
