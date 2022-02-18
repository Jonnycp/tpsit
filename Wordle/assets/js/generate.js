const generateBoard = (w, h) => {
    let boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    let board = document.createElement("div");
    board.classList.add("board");

    for (let i = 0; i < h; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < w; j++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);
        }
        board.appendChild(row);
    }

    boardContainer.appendChild(board);
    return boardContainer;
}

const generateKeyboard = () => {
    let letters = ["qwertyuiop", "asdfghjkl", "↵zxcvbnm←"];

    let keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");
    
    for (let i = 0; i < letters.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < letters[i].length; j++) {
            let btn = document.createElement("button");
            let key;
            if(letters[i][j] == "↵"){
                key = document.createTextNode("enter")
                btn.classList.add("big");
            }else if(letters[i][j] == "←"){
                key = document.createElement("img");
                key.src = "./assets/img/backspace.svg";
                btn.classList.add("big")
            }else{
                key = document.createTextNode(letters[i][j])
            }
            btn.appendChild(key);
            row.appendChild(btn);
        }
        
        keyboard.appendChild(row)
    }
    return keyboard;
}

//Generate
let gameSection = document.querySelector(".game");
gameSection.appendChild(generateBoard(5, 6));
gameSection.appendChild(generateKeyboard());
