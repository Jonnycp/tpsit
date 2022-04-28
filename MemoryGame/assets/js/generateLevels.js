const generateLevelsPage = () => {
    let container = document.createElement("div")
    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Seleziona livello"))
    container.appendChild(h2)
    
    getLevels().
    then(levels => {
        levels.forEach(level => {
            container.appendChild(generateLevelsContainer(level))
        })
    })
    return container
}

const generateLevelsContainer = (levels) => {
    if(!levels){
        console.error("Nessun livello trovato");
        return;
    }
    
    let levelsContainer = document.createElement("section")
    levelsContainer.classList.add("levelsContainer")

    //Info sul livello
    let levelDescription = document.createElement("div");
    levelDescription.classList.add("info")

    let difficulty = document.createElement("h3")
    difficulty.appendChild(document.createTextNode(levels.name))
    levelDescription.appendChild(difficulty)

    let description = document.createElement("h4")
    description.appendChild(document.createTextNode(levels.description))
    levelDescription.appendChild(description)
    levelsContainer.appendChild(levelDescription)

    let sliderLevels = document.createElement("div");
    sliderLevels.classList.add("slider");

    levels.levels.forEach(level => {
        sliderLevels.appendChild(generateSingleLevel(level, {completated: false, stars: 0}))
    })
    
    levelsContainer.appendChild(sliderLevels);
    
    return levelsContainer;
}

const generateSingleLevel = (level, userData) => {
    let levelA = document.createElement("a");
    levelA.classList.add("level")
    levelA.href = "./game.html?level=" + level.id;
    if(userData.completated) levelA.classList.add("completated")

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(level.name))
    levelA.appendChild(h3)

    let h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode(level.content))
    levelA.appendChild(h4)

    let details = document.createElement("div");
    details.classList.add("details");
    details.appendChild(generateDetail("./assets/img/icons/time.svg", level.winInto.time))
    details.appendChild(generateDetail("./assets/img/icons/cards.svg", level.winInto.moves))
    levelA.appendChild(details)

    levelA.appendChild(generateStars(!userData.completated ? 0 : userData.stars))
    return levelA;
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


document.querySelector(".levels").appendChild(generateLevelsPage());
