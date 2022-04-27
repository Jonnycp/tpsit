const generateLevelsPage = () => {
    let container = document.createElement("div")
    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Seleziona livello"))
    container.appendChild(h2)
    
    let levelsContainer = document.createElement("section")
    levelsContainer.classList.add("levelsContainer")

    //Info sul livello
    let levelDescription = document.createElement("div");
    levelDescription.classList.add("info")

    let difficulty = document.createElement("h3")
    difficulty.appendChild(document.createTextNode("Facile"))
    levelDescription.appendChild(difficulty)

    let description = document.createElement("h4")
    description.appendChild(document.createTextNode("Meglio iniziare da qui!"))
    levelDescription.appendChild(description)
    levelsContainer.appendChild(levelDescription)

    let levels = document.createElement("div");
    levels.classList.add("slider")
    levels.appendChild(generateSingleLevel("Livello 1", "Frutta", {time: "10 sec", cards: "4 mosse"}, 2, true))
    levels.appendChild(generateSingleLevel("Livello 1", "Frutta", {time: "10 sec", cards: "4 mosse"}, 2, true))
    levels.appendChild(generateSingleLevel("Livello 1", "Frutta", {time: "10 sec", cards: "4 mosse"}, 2, true))
    levelsContainer.appendChild(levels);

    container.appendChild(levelsContainer);

    return container
}

const generateSingleLevel = (name, type, detail, stars, completated) => {
    let level = document.createElement("a");
    level.classList.add("level")
    if(completated) level.classList.add("completated")

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(name))
    level.appendChild(h3)

    let h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(type))
    level.appendChild(h4)

    let details = document.createElement("div");
    details.classList.add("details");
    details.appendChild(generateDetail("../assets/img/icons/time.svg", detail.time))
    details.appendChild(generateDetail("../assets/img/icons/cards.svg", detail.cards))
    level.appendChild(details)

    level.appendChild(generateStars(stars))
    return level;
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

const generateStars = (num) => {
    let stars = document.createElement("div");
    stars.classList.add("stars");

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

document.querySelector(".levels").appendChild(generateLevelsPage());
