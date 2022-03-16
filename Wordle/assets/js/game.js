import {animate} from "./animate.js";

const checkWord = (word) => {
    for(let i=0;i<word.length;i++){
        let char = word.charAt(i);
        changeState(i, "correct")
    }
}

const changeState = (index, state) => {
    let row = document.querySelectorAll(".board .row:not([data-state])")[0];
    row.children[index].dataset.state = state
}

const row2word = (row) => {
    let word = "";
    [...row.children].forEach(i => word+= i.innerText);

    return word;
}

const submit = () => {
    let rows = document.querySelectorAll(".board .row:not([data-state])");
    let word = row2word(rows[0]);

    if(word.length == 5){
        if(rows.length > 1){
            checkWord(word)
            rows[0].setAttribute("data-state", "validated")
        }else{
            console.log("fine gioco")
        }
    }else{
        generateErrorToast("Non abbastanza lettere")
    }    
}

const backspace = () => {
    let row = document.querySelector(".board .row:not([data-state])");
    let found = false;
    let i=row.children.length-1;
    while(!found && i >= 0){
        let tile = row.children[i];
        if(tile.dataset.state == "tbd"){
            found = true;
            tile.innerText = "";
            tile.removeAttribute("data-state");
        }
        i--;
    }
}

const handleWrite = (key) => {
    const regex = new RegExp('[A-Za-z]');
    if(key.length == 1 && regex.test(key)){
        addLetter(key);
    }else if(key == "Enter"){
        submit();
    }else if(key == "Backspace"){
        backspace();
    }
}

const addLetter = (letter) => {
    let row = document.querySelector(".board .row:not([data-state])");
    let found = false;
    let i=0;
    while(!found && i < row.children.length){
        let tile = row.children[i];
        if(tile.dataset.state != "tbd"){
            found = true;
            tile.innerText = letter;
            tile.setAttribute("data-state", "tbd");
            animate(tile, "pop", 100);
        }
        i++
    }
}

const handleKeyboard = () => {
    //FrontEnd Keyboard
    let keyboardBtns = document.querySelectorAll(".keyboard .row button");
    keyboardBtns.forEach(i => {
        i.addEventListener("click", (e) => {
            let k = e.currentTarget.dataset.key;
            k = k == "enter" ? 13 : k == "backspace" ? 8 : k;
            handleWrite(k)
        })
    })

    //Physical Keyboard (Prevent holding key)
    document.body.addEventListener("keydown", (e) => {
        if(!e.repeat){
            handleWrite(e.key)
        }
    });
}

handleKeyboard();

//TODO: Block TAB