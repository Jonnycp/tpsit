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

const string2seconds = (s) => {
    parts = s.split(":");
    
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

const seconds2string = (sec) => {
    return Math.floor(sec / 60) + ":" + (sec % 60 < 10 ? "0" : "") + sec % 60;
}

const seconds2stringExtended = (sec) => {
    return Math.floor(sec / 60) > 0 ? Math.floor(sec / 60) + " min" : "" + (sec % 60 < 10 ? "0" : "") + sec % 60 + " sec";
}

const generateDetail = (src, text) => {
    let icon = document.createElement("div");
    let img = document.createElement("img")
    img.src = src;
    icon.appendChild(img);
    let desc = document.createElement("h5");
    desc.appendChild(document.createTextNode(text));
    icon.appendChild(desc);
    return icon;
}

const animate = (obj, animation, duration, callback) => {
    obj.dataset.animation = animation;
    setTimeout(() => {
        obj.dataset.animation = "idle";
        callback ? callback() : null;
    }, duration);
}