const findLevel = (levels, id) => {
    let level;
    getLevelsArray(levels).map(i => {
        if(i.id == id){
            level = i;
            return;
        }
    })
    return level;
}

const printName = (level) => {
    let levelName = document.querySelector(".levelName h2")
    levelName.innerText = level.name.toUpperCase() + " - " + level.difficulty;
}

getLevels()
.then(levels => {
    let id = getLevelId() ? getLevelId() : location.href = "index.html";
    let level = findLevel(levels, id)
    !level ? location.href = "index.html" : null;
    printName(level);

    let game = document.querySelector("section.game")
    game.appendChild(generateDetails(level))

    game.appendChild(generateBoard(level));

    game.appendChild(generateStats());

    return level
})
.then((l) => document.querySelector(".mainContainer").appendChild(generateStartingModal(l)))


const generateDetails = (level) => {
    let details = document.createElement("div");
    details.classList.add("details");

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(level.content));
    details.appendChild(h3);

    details.appendChild(generateStars(0, ["noBorder"]));
    
    let time = document.createElement("div");
    time.classList.add("time");
    let img = document.createElement("img")
    img.src="assets/img/icons/time.svg";
    time.appendChild(img)
    let span = document.createElement("span")
    span.appendChild(document.createTextNode("0:00"))
    time.appendChild(span)
    
    details.appendChild(time);
    return details;
}

const generateBoard = (level) => {
    let board = document.createElement("div");
    board.classList.add("board");
    if(level.cards % 2 != 0){
        console.error("Il numero di carte non è pari");
        return;
    }
    for(let i=0; i<level.cards; i++){
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = i

        let front = document.createElement("img");
        front.classList.add("front");
        front.src = "./assets/img/cards/card_front.png"
        card.appendChild(front);

        let back = document.createElement("div");
        back.classList.add("back");
        card.appendChild(back);
        board.appendChild(card);
    }
    return board;
}

const generateStats = () => {
    let stats = document.createElement("div");
    stats.classList.add("stats");

    let couples = document.createElement("div");
    couples.classList.add("value");
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("0"));
    couples.appendChild(span);
    couples.appendChild(document.createTextNode("Coppie trovate"));
    stats.appendChild(couples);

    let foundCards = document.createElement("div");
    foundCards.classList.add("foundCards");
    let card = document.createElement("div");
    card.classList.add("card");

    stats.appendChild(foundCards);

    let moves = document.createElement("div");
    moves.classList.add("value");
    let spanMoves = document.createElement("span");
    spanMoves.appendChild(document.createTextNode("0"));
    moves.appendChild(spanMoves);
    moves.appendChild(document.createTextNode("Mosse"));
    stats.appendChild(moves);

    return stats;
}

const generateStartingModal = (level) => {
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modalContainer");

    let modal = document.createElement("div");
    modal.classList.add("modal");
    animate(modal, "pop", 500)

    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(level.name));
    modal.appendChild(h2);

    let description = document.createElement("p");
    description.appendChild(document.createTextNode("Ritrova le coppie che si sono perse in questo tabellone"))
    modal.appendChild(description);

    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Ricorda hai a disposizione:"));
    modal.appendChild(h3);

    let details = document.createElement("div");
    details.classList.add("details");
    details.appendChild(generateDetail("./assets/img/icons/time.svg", seconds2stringExtended(level.winInto.time)))
    details.appendChild(generateDetail("./assets/img/icons/cards.svg", level.winInto.moves + " mosse"))
    modal.appendChild(details)

    let button = document.createElement("button");
    button.appendChild(document.createTextNode("AVVIA"))
    modal.appendChild(button);

    button.addEventListener("click", (e) => {
        animate(modal, "popReverse", 300, () => {
            modalContainer.remove();
            runGame(level)
        })
    })

    modalContainer.appendChild(modal);
    return modalContainer;
}

const generateEndModal = (points, time, moves) => {
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modalContainer");

    let modal = document.createElement("div");
    modal.classList.add("modal", "end");
    animate(modal, "pop", 500)

    modal.appendChild(generateStars(points, ["noBorder", "big"]))

    let h2 = document.createElement("h2");
    let congrats = ["Hai vinto!", "Ottimo", "Eccellente", "Bravo!", "Grande!", "Troppo forte!"]
    h2.appendChild(document.createTextNode(congrats[Math.floor(Math.random() * congrats.length)]));
    modal.appendChild(h2);


    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Hai usato:"));
    modal.appendChild(h3);

    let details = document.createElement("div");
    details.classList.add("details");
    details.appendChild(generateDetail("./assets/img/icons/time.svg", seconds2stringExtended(time)))
    details.appendChild(generateDetail("./assets/img/icons/cards.svg", moves + " mosse"))
    modal.appendChild(details)

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.appendChild(createButton("./assets/img/icons/home.svg", () => window.location.href = "./index.html"))
    buttons.appendChild(createButton("./assets/img/icons/refresh.svg", () => window.location.reload()))
    buttons.appendChild(createButton("./assets/img/icons/arrow.svg", () => window.location.search = "?level="+(parseInt(getLevelId())+1), "PROSSIMO"))

    modal.appendChild(buttons);


    modalContainer.appendChild(modal);
    return modalContainer;
}

const createButton = (icon, callback, text) => {
    let img = document.createElement("img");
    img.src = icon;
    let button = document.createElement("button");
    text ? button.appendChild(document.createTextNode(text)) : null
    text ? button.classList.add("big") : null;
    button.appendChild(img);

    button.addEventListener("click", (e) => callback())
    return button;
}

//TODO: Modali e responsive... (in seguito localStorage e login forse)
