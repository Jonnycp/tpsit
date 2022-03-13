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
            let key = {
                node: null,
                code: letters[i][j].toUpperCase().charCodeAt()
            };
            if(letters[i][j] == "↵"){
                key.node = document.createTextNode("enter")
                key.code = "enter"
                btn.classList.add("big");
            }else if(letters[i][j] == "←"){
                key.node = document.createElement("img");
                key.code = "backspace"
                key.node.src = "./assets/img/backspace.svg";
                btn.classList.add("big")
            }else{
                key.node = document.createTextNode(letters[i][j])
            }

            btn.setAttribute("data-key", key.code);
            btn.appendChild(key.node);
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
