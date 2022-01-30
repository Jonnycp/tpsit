const game = [
    {
        id: 1,
        name: "Sasso",
        img: "./assets/img/rock.png",
        winIf: 3
    },
    {
        id: 2,
        name: "Carta",
        img: "./assets/img/paper.png",
        winIf: 1
    },
    {
        id: 3,
        name: "Forbici",
        img: "./assets/img/scissors.png",
        winIf: 2
    }
]



let btns = document.querySelectorAll("button[data-type]");
let history = document.querySelector(".history");
let players = document.querySelectorAll("div[data-score]");

let score = {
    user: 0,
    bot: 0
}

let reset = () => {
    score = {
        user: 0,
        bot: 0
    };
    let h3 = document.createElement("h3");
    let text = document.createTextNode("Sasso, Carta o Forbici?");
    h3.appendChild(text)
    history.innerHTML = '';
    history.append(h3)


    players.forEach(i => {
        i.querySelector("h3").innerHTML = score[i.dataset.score]
    });
    document.querySelectorAll(".d-flex div").forEach(i => {
        i.classList.add("flexBasis")
    });
    document.querySelectorAll("img").forEach(i => {
        i.classList.add("hide")
    });
}

let chooseWinner = (a, b) => {
    if(a != b){
       if(a.winIf == b.id){
           return a
       }else{
           return b
       }
    }else{
        return "Pareggio"
    }
}

let ai = () => {
    let random = Math.floor(Math.random() * 3);
    return game[random];
}

let type2id = (type) => {
    for(let i=0; i<game.length; i++){
        if(game[i].name.toLowerCase() == type.toLowerCase()){
            return game[i];
        }
    }
}

let printHistory = (message, what) => {
    let extract = document.createElement("h3");
    let text = document.createTextNode(message);
    extract.appendChild(text)
    if(what){
        let strong = document.createElement("strong");
        let strongText = document.createTextNode(what);
        strong.appendChild(strongText)
        extract.appendChild(strong)
    }
    
    history.innerHTML += '';
    history.append(extract)
}

let printScore = (user, bot) => {
    players.forEach(i => {
        i.querySelector("img").classList.remove("hide");
        if(i.dataset.score == "user"){
            i.querySelector("img").src = user.img;
        }else{
            i.querySelector("img").src = bot.img;
        }
        i.querySelector("h3").innerHTML = score[i.dataset.score];
    });
}

let print = (user, bot, winner) => {
    document.querySelectorAll(".d-flex div").forEach(i => {
        i.classList.remove("flexBasis")
    });
    history.innerHTML = '';

    printScore(user, bot);
    printHistory("Hai estratto ", user.name);
    printHistory("Il computer ha estratto ", bot.name);
    printHistory("Il punto va " + winner)
}

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.currentTarget.dataset.type != "reset"){
            let user = type2id(e.currentTarget.dataset.type);
            let bot = ai();
            let winner = chooseWinner(user, bot);
            
            if(user == winner){
                score.user++;
                print(user, bot, "a te!")
            }else if(bot == winner){
                score.bot++;
                print(user, bot, "al computer!")
            }else{
                print(user, bot, "a nessuno (Pareggio)!")
            }
            
        }else{
            reset();
        }
        
    })
});