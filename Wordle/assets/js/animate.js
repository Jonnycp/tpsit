export const animate = (tile, animation, ms) => {
    tile.setAttribute("data-animation", animation)
    setInterval(() => {
        tile.dataset.animation = "idle";
    }, ms)
}