const runGame = (level) => {
  let domCards = document.querySelectorAll(".board .card");
  getAllCardsOf(level)
    .then(({cards}) => {
        let timer = startTimer();

        let allCards = getCards(cards, level);

        domCards.forEach((card) => {
            card.addEventListener("click", (e) => {
                let selectedCards = document.querySelectorAll(".card.selected");
                if(selectedCards.length < 2){
                    if(!e.currentTarget.classList.contains("selected") && !e.currentTarget.classList.contains("match")){
                        putItem(e.currentTarget, allCards);
                        e.currentTarget.classList.add("selected");

                        let selectedCards = document.querySelectorAll(".card.selected");
                        if(selectedCards.length == 2){
                            checkMatch(selectedCards, level, timer);
                            updateStats("moves")
                        }
                    }
            }
                
            });
          });
    })
};

const getAllCardsOf = (level) => {
    return fetch("./assets/data/cards.json")
    .then(response => response.json())
    .then(r => {
        let cardsCollection;
        for(let i=0; i<r.length; i++){
            if(r[i].type == level.content){
                cardsCollection = r[i];
                return cardsCollection;
            }
        }
    })
}

const putItem = (card, allCards) => {
    let back = card.querySelector(".back");
    if(!back.querySelector("img")){
        let img = document.createElement("img");
        img.src = allCards[card.dataset.id].image;
        back.appendChild(img);
    }
}

const getCards = (cards, level) => {
    let array = [];
    for(let i=0; i<(level.cards/2); i++){
        let random = Math.floor(Math.random() * cards.length);
        array.push(cards[random]);
        cards.splice(random, 1);
    }

    return shuffleArray(duplicateArray(array));
}

const shuffleArray = (array) => {
    /*https://bost.ocks.org/mike/shuffle/*/
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const duplicateArray = (cards) => {
    let newArray = cards;
    cards.forEach(i => newArray.push(i));
    return newArray;
}

const checkMatch = (cards, level, timer) => {
    let srcs = [];
    cards.forEach(card => {
        srcs.push(card.querySelector(".back img").src);
    })
    if(srcs[0] == srcs[1]){
        cards.forEach(card => {
            card.classList.add("match");
            card.classList.remove("selected");
        })
        updateStats("couples");
        addFoundCards(cards[0]);
        checkWin(level, timer);
    }else{
        setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove("selected");
                })
            }, 1000)
    }
}

const updateStats = (type) => {
    let stats = document.querySelectorAll(".stats .value span");
    type = type == "couples" ? 0: 1;

    stats[type].innerText = parseInt(stats[type].innerText) + 1;
}

const addFoundCards = (card) => {
    setTimeout(() => {
        let foundCards = document.querySelector(".foundCards");

        let newCard = document.createElement("div");
        animate(newCard, "puff", 500).then(() => {
            let anim = newCard.animate(
                [
                    { transform: 'rotate(0)'}, 
                    { transform: `rotate(${Math.floor(Math.random() * (-60 - 60) + 60)}deg)` }
                ], {
                    duration: 100,
                    easing: 'steps(4, end)',
                    fill: 'forwards'
                });
            anim.play();
        })
        
        let img = document.createElement("img");
        img.src = card.querySelector(".back img").src;
        newCard.appendChild(img);
        foundCards.appendChild(newCard);
    }, 800)   
}

const startTimer = () => {
    let timer = document.querySelector(".time span");
    let time = [0, 0]
    let interval = setInterval(() => {
        time[0]++;
        if(time[0] == 60){
            time[0] = 0;
            time[1]++;
        }
        timer.innerText = `${time[1]}:${time[0] < 10 ? "0"+time[0] : time[0]}`;
    }, 1000)
    return interval;
}

const stopTimer = (timer) => {
    clearInterval(timer);
    return document.querySelector(".time span").innerText;
}


const checkWin = (level, timer, moves) => {
    if(document.querySelectorAll(".card.match").length == level.cards){
        let time = stopTimer(timer)
        startConfetti();
        setTimeout(() => {
            stopConfetti();
            let p = getPoints(level, time);
            updateStars(p)
            let tempo = string2seconds(document.querySelector(".time span").innerText);
            let moves = parseInt(document.querySelectorAll(".stats .value span")[1].innerText)
            document.querySelector(".mainContainer").appendChild(generateEndModal(p, tempo, moves));
        }, 800)
    }
}

const getPoints = (level, time) => {
    let moves = parseInt(document.querySelectorAll(".stats .value span")[1].innerText);
    time = string2seconds(time);

    if(moves <= level.winInto.moves && time <= level.winInto.time) return 3;
    if(moves <= level.cards && time <= level.winInto.time) return 2;
    if(moves == level.winInto.move && time >= level.winInto.time) return 2;
    return 1;
}

const updateStars = (points) => {
    let stars = document.querySelectorAll(".stars img");
    stars.forEach((star, i) => {
        if(i == 0 && points == 1) star.src = "./assets/img/icons/filled_star.png";
        if(i != 1 && points == 2) star.src = "./assets/img/icons/filled_star.png";
        if(points == 3) star.src = "./assets/img/icons/filled_star.png"
    })
}

