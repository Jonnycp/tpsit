export const animate = (tile, animation, ms) => {
    tile.setAttribute("data-animation", animation)
    setInterval(() => {
        tile.dataset.animation = "idle";
    }, ms)
}

export const animateRow = (row) => {
    [...row.children].forEach(tile => {
        animate(tile, "flip-in")
        setInterval(() => {
            animate(tile, "flip-out")
        }, ms)
    })
}