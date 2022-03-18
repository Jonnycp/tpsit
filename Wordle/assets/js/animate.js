export const animate = (tile, animation, ms) => {
    tile.setAttribute("data-animation", animation)
    setTimeout(() => {
        tile.dataset.animation = "idle";
    }, ms)
}

export const animateRow = (row, state) => {
    if(state.length == row.children.length){
        for(let i=0; i<row.children.length; i++){
            let tile = row.children[i];
            setTimeout(() => {
                animateSequence(tile, ["flip-in", "flip-out", "idle"], 250, state[i])
            }, i * 250)
        }
        [...row.children].forEach(tile => tile.removeAttribute("data-animation"))
    }else{
        console.error("Stato tiles non valido")
    }
}

export const animateSequence = (tile, animations, ms, state) => {
    tile.setAttribute("data-animation", animations[0])
    for(let i=1; i<animations.length; i++){
        setTimeout(() => {
            tile.dataset.animation = animations[i];
            tile.dataset.state = state;
        }, i * ms)
    }
}
