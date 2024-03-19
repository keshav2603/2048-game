let bord;
let rows = 4;
let columns = 4;
let score = 0;
const playTiles = document.querySelectorAll(".tile");
const playerScore=document.querySelector("#player-score");
const resultElement = document.querySelector("#result");
const restartBtnElement = document.querySelector("#newgame-btn");

bord = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0]
];

document.addEventListener("DOMContentLoaded", function () {
    bord.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            updateTile(playTiles[index], value);
        });
    });
});

// Function to update tile value and appearance
const updateTile = (tile, num) => {
    tile.innerText = "";
    tile.value = "";
    if (num <= 2048) {
        if (num > 0) {
            tile.innerText = num;
            tile.className = "";
            tile.classList.add("tile"); // Clear existing classes
            tile.classList.add(`x${num}`); 
        }
        
    }
}

// Function to filter out zero values from the row
const filterZero = (row) => {
    return row.filter(num => num !== 0);
}

// Function to implement the sliding mechanism
const slide = (row) => {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row; // Return the modified row
}

// Function to slide tiles to the left
const slideLeft = () => {
    for (let r = 0; r < rows; r++) {
        let row = bord[r].slice(); // Copy the row to avoid modifying the original array
        bord[r] = slide(row);
        for (let c = 0; c < columns; c++) {
            const index = r * columns + c;
            updateTile(playTiles[index], bord[r][c]);
        }
    }
   generateRandomTile();

}
const slideRight = () => {
    for (let r = 0; r < rows; r++) {
        let row = bord[r].slice(); // Copy the row to avoid modifying the original array
        row.reverse();
        bord[r] = slide(row).reverse();
        
        for (let c = 0; c < columns; c++) {
            const index = r * columns + c;
            updateTile(playTiles[index], bord[r][c]);
        }
    }
   generateRandomTile();

}

const slideUp =()=>{
    for (let c = 0; c < columns; c++) {
        let column = [];
        for (let r = 0; r < rows; r++) {
            column.push(bord[r][c]);
        }
        column=slide(column);
        for (let r = 0; r < rows; r++) {
            bord[r][c] = column[r];
            const index = r * columns + c;
            updateTile(playTiles[index], bord[r][c]);
        }
   }
   generateRandomTile();

}

const slideDown=()=>{
    for (let c = 0; c < columns; c++) {
        let column = [];
        for (let r = 0; r < rows; r++) {
            column.push(bord[r][c]);
        }
        column.reverse();
        column=slide(column);
        column.reverse();
        for (let r = 0; r < rows; r++) {
            bord[r][c] = column[r];
            const index = r * columns + c;
            updateTile(playTiles[index], bord[r][c]);
        }
   }
   generateRandomTile();
}
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        slideLeft();
    }
    else if(event.key === "ArrowRight"){
        slideRight();
    }
    else if(event.key === "ArrowUp"){
        slideUp();
    }
    else if (event.key === "ArrowDown") {
        slideDown();
    }
    else{
        window.alert("press valid key");
    }
    for (let i = 0; i < 16; i++) {
        if (playTiles[i].innerText == 0) {
            playTiles[i].className = "";
            playTiles[i].classList.add("tile");
        }
    }
    // score update of player
    playerScore.innerText=score;
    displayResult();
});


document.addEventListener("DOMContentLoaded", function () {
    // Select the #gameover element
    // Hide the #gameover element by setting its display property to "none"
    resultElement.style.display = "none";
});


const generateRandomTile = () => {
    const emptyTiles = [];
    // Find all empty tiles
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (bord[r][c] === 0) {

                emptyTiles.push({ row: r, col: c });
                
            }
        }
    }
    // Choose a random empty tile
    const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    // Assign a random value (2 or 4) to the chosen tile
   // Randomly choose a value for the empty tile
    let randomValue;
    if (Math.random() < 0.9) {
        randomValue = 2; // 90% chance of assigning 2
    } else {
        randomValue = 4; // 10% chance of assigning 4
    }

// Assign the randomly chosen value to the empty tile
bord[randomEmptyTile.row][randomEmptyTile.col] = randomValue;

    // Update the corresponding tile in the UI
    updateTile(playTiles[randomEmptyTile.row * columns + randomEmptyTile.col], bord[randomEmptyTile.row][randomEmptyTile.col]);
}


const displayResult = ()=>{
    const winMessage=document.querySelector("#result p");
    if(checkWin()){
        winMessage.innerText="YOU WIN THE GAME";
        resultElement.style.display = "flex";
    }
    else if(checkGameOver()){
        winMessage.innerText="GAME OVER";
        resultElement.style.display = "flex";
    }
}


const checkWin = () =>{
    for(let i=0; i < rows; i++){
        for(let j=0; j < columns; j++){
            if(bord[i][j] === 2048){
                return true;
            }
        }
    }
    return false;
}

const checkGameOver= () =>{
    
        for(let i=0; i < rows; i++){
            for(let j=0; j < columns; j++){
                if(bord[i][j] === 0){
                  return false;
                }
            }
        }
       for(let i=0;i<rows-1;i++){
           for(let j=0;j<columns-1;j++){
               if(bord[i][j]==bord[i][j+1]){
                   return false;
               }
               if(bord[i][j]==bord[i+1][j]){
                   return false;
               }
           }
       }
       return true;
}
    


const restartGame = () => {
    const newBord = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 0]
    ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            bord[r][c] = newBord[r][c];
            const index = r * columns + c;
            playTiles[index].className = "";
            playTiles[index].classList.add("tile");
            updateTile(playTiles[index], bord[r][c]);
            score = 0;
            playerScore.innerText = score;
        }
    }
    // Hide the game over message
    resultElement.style.display = "none";

};

// Assuming restartBtnElement is already defined in your code
restartBtnElement.addEventListener('click', () => {
    
    restartGame();
});
