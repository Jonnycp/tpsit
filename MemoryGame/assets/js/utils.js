const getLevels = () => {
    return fetch("./assets/data/levels.json")
        .then(response => response.json() )
}

const getLevelsArrayPromise = () => {
    let array = [];
    return getLevels()
    .then(levels => {
        levels.forEach(level => {
            level.levels.forEach(l => {
                array.push(l)
            })
        })
    })
    .then(l => array)   
}

const getLevelsArray = (levels) => {
    let array = [];
    levels.forEach(level => {
        level.levels.forEach(l => {
            array.push(l)
        })
    })
    return array;
}

const getLevelId = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("level");
}

const generateStars = (num, noBorder) => {
    let stars = document.createElement("div");
    stars.classList.add("stars");
    noBorder ? stars.classList.add("noBorder") : null;

    for (let i = 0; i < 3; i++) {
        let img = document.createElement("img");
        img.src = "./assets/img/icons/empty_star.svg";
        if(i == 0 && num == 1) img.src = "./assets/img/icons/filled_star.png";
        if(i != 1 && num == 2) img.src = "./assets/img/icons/filled_star.png";
        if(num == 3) img.src = "./assets/img/icons/filled_star.png";
        stars.appendChild(img);
    }
    return stars;
}