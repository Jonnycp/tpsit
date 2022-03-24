export const animate = (tile, animation, ms) => {
    tile.setAttribute("data-animation", animation)
    setTimeout(() => {
        tile.dataset.animation = "idle";
    }, ms)
}

export const animateRowState = (row, state, word, end, win, updateKeyboard, handleKeyboard) => {
    if(state.length == row.children.length){
        for(let i=0; i<row.children.length; i++){
            let tile = row.children[i];
            setTimeout(() => {
                animateSequence(tile, ["flip-in", "flip-out", "idle"], 250, state[i])
            }, i * 250)
        }
        setTimeout(() => {
            updateKeyboard(state, word)
            if(!end){
                handleKeyboard()
            }
            if(win){
                animateRowWin(row)
            }
        }, (state.length+1)*250)
    }else{
        console.error("Stato delle tiles non valido")
    }
}

export const animateRowWin = (row, ms) => {
    for(let i=0; i<row.children.length; i++){
        let tile = row.children[i];
        setTimeout(() => {
            animateSequence(tile, ["bounce", "idle"], 1000)
        }, i * 100)
    }
    setTimeout(() => {
        console.log("FINE")
    }, row.children.length*100)
}

export const animateSequence = (tile, animations, ms, state) => {
    tile.setAttribute("data-animation", animations[0])
    for(let i=1; i<animations.length; i++){
        setTimeout(() => {
            tile.dataset.animation = animations[i];
            state != undefined ? tile.dataset.state = state : null;
        }, i * ms)
    }
}
