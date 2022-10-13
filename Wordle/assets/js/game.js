import {animate, animateRowState} from "./animate.js";

const checkWord = (word, winWord) => {
    winWord = winWord.toUpperCase();
    let state = [];
    for(let i=0;i<word.length;i++){
        let char = word.charAt(i);
        if(char == winWord.charAt(i)){
            state[i] = "correct" 
        }else if(winWord.includes(char)){
            state[i] = "present" 
        }else{
            state[i] = "nope" 
        }
    }
    return refactorState(state, word, winWord);
}

const refactorState = (state, word, winWord) => {
    for(let i=0; i<state.length; i++){
        let char = word[i]
        for(let j=i+1; j<state.length; j++){
            if(char == word[j]){
                if(winWord[i] != winWord[j]){
                    if(state[j] != "correct"){
                        state[j] = "nope"
                    }
                    if(state[j] == "correct"){
                        state[i] = "nope"
                    }
                }
            }
        }
    }
    return state;
}

const allIndexOf = (char, word) => {
    let  indexs=[];
    [...word].forEach((c, i) => {
        if(char.toUpperCase() == c.toUpperCase()){
            indexs.push(i)
        }
    })
    return indexs
}

const getNumberState = (state, find) => {
    let n = 0;
    state.forEach(i => i == find ? n++ : null);

    return n;
}
const wordExist = (word, dict) => {
    let found = false;
    dict.forEach(i => {
        if(i.toUpperCase().trim() == word.toUpperCase()){
            found = true;
        }
    })
    return found;
}

const randomByDateSeed = (variation) => {
    let date = new Date();
    let seed = date.getDate()+date.getMonth()+date.getFullYear()*(variation || 1);
    return Math.abs(Math.sin(seed));
}

async function getDictionary() {
    return fetch("./assets/dict/dictionary-curated.txt")
    .then(res => res.text())
    .then(text => text.split("\n"))
    .catch(e => console.error("Impossibile ricevere il dizionario", e))
}

const generateWord = (dict) => {
    return dict[Math.floor(randomByDateSeed()*dict.length)].trim()
}

const row2word = (row) => {
    let word = "";
    [...row.children].forEach(i => word+= i.innerText);
    
    return word;
}

const submit = () => {
    let rows = document.querySelectorAll(".board .row:not([data-state])");
    let word = row2word(rows[0]);
    if(word.length == rows[0].children.length){
            getDictionary()
            .then(dictonary => {
                if(wordExist(word, dictonary)){
                    let winWord = generateWord(dictonary);

                    
                    let state = checkWord(word, winWord);
                    
                    let end = false, win = false;
                    rows[0].setAttribute("data-state", "validated")
                    if(getNumberState(state, "correct") == word.length){
                        end = true;
                        win = true;
                    }else if(rows.length == 1){
                        end = true;
                    }

                    //Console.log() parola vincente
                    if(!end && rows.length == 6){
                        console.groupCollapsed(`%cTi piace vincere facile?`, "color: red; font-size: 25px");
                        console.groupCollapsed(`%cHo pensato anche alle persone come te 😅`, "color: green; font-size: 20px");
                            console.groupCollapsed(`%cPerò prova a giocare... è semplice`, "color: blue; font-size: 18px");
                                console.groupCollapsed(`%cDevi solo indovinare una parola italiana di 5 lettere`, "color: blueviolet; font-size: 16px");
                                    console.groupCollapsed(`%cNon si perde niente, si vince conoscenza di nuove parole`, "color: chocolate; font-size: 15px");
                                        console.groupCollapsed(`%cVa bene, hai vinto tu...`, "color: darkorange; font-size: 14px");
                                            console.groupCollapsed(`%cLa parola è`, "color: darkturquoise; font-size: 12px");
                                                console.log(btoa(encodeURIComponent(winWord)))
                                            console.groupEnd();
                                        console.groupEnd();
                                    console.groupEnd();
                                console.groupEnd();
                            console.groupEnd();
                        console.groupEnd();
                        console.groupEnd();
                    }
                    
                    disableKeyboard()
                    //TODO: Si può ottimizzare con una promise
                    animateRowState(rows[0], state, word, end, win, updateKeyboard, handleKeyboard, endGame, winWord);
                }else{
                    generateErrorToast("Parola non esistente", true, animate, rows[0])
                }
            })
    }else{
        generateErrorToast("Non abbastanza lettere", true, animate, rows[0])
    }    
}

const endGame = (win, winWord) => {
    //saveGame(win)
    if(win){
        let rows = document.querySelectorAll(".board .row[data-state]");
        let congrates = ["Genio", "Magnifico", "Impressionante", "Splendido", "Ottimo", "Fiù!"];
        generateErrorToast(congrates[rows.length-1].toUpperCase(), true)
    }else{
        generateErrorToast(winWord.toUpperCase(), false)
    }
    setTimeout(() => endGameModal(true), 1000)
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

const updateKeyboard = (state, word) => {
    [...word].forEach((c, i) => {
        let btn = document.querySelector(".keyboard button[data-key="+c.toLowerCase()+"]");
        let correctIndex;
        allIndexOf(c, word).forEach(index => {
            if(state[index] == "correct"){
                correctIndex = index
            }
        })
        if(correctIndex == undefined){
            btn.setAttribute("data-state", state[i])
        }else{
            btn.setAttribute("data-state", "correct")
        }
    })
}

//Can't use anonymous function, it must be passed to removeEventListener
const frontEndKeyBoard = (e) => {
    let k = e.currentTarget.dataset.key;
    k = k == "enter" ? 13 : k == "backspace" ? 8 : k;
    handleWrite(k)
}
const physicalKeyboard = (e) => {
    if(!e.repeat){
        handleWrite(e.key)
    }
}

const handleKeyboard = () => {
    //FrontEnd Keyboard
    let keyboardBtns = document.querySelectorAll(".keyboard .row button");
    keyboardBtns.forEach(i => {
        i.addEventListener("click", frontEndKeyBoard)
    })

    //Physical Keyboard (Prevent holding key)
    document.body.addEventListener("keydown", physicalKeyboard);
}

const disableKeyboard = () => {
    //FronEnd Keyboard
    let keyboardBtns = document.querySelectorAll(".keyboard .row button");
    keyboardBtns.forEach(i => {
        i.removeEventListener("click", frontEndKeyBoard)
    })

    //Physical Keyboard
    document.body.removeEventListener("keydown", physicalKeyboard)
}

handleKeyboard();


//TODO: Block TAB
//TODO: Block into animations and endGame
