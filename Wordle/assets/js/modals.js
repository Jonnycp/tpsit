const generateCookieModal = (text) => {
    let cookieContainer = document.createElement("div");
    cookieContainer.classList.add("cookieContainer")

    //MODAL HEADER
    let modalHeader = document.createElement("header");
    let textHeader = document.createElement("h3");
    textHeader.appendChild(document.createTextNode("Questo sito utilizza i cookie"));
    modalHeader.appendChild(textHeader);

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("closeBtn");
    modalHeader.appendChild(closeBtn);

    cookieContainer.appendChild(modalHeader);

    //MODAL TEXT
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(text));
    cookieContainer.appendChild(p);

    //BUTTON
    let btn = document.createElement("button");
    btn.appendChild(document.createTextNode("ACCETTA"));
    cookieContainer.appendChild(btn);

    return cookieContainer;
}

//document.body.appendChild(generateCookieModal("Questo sito utilizza i cookie e simili per riconoscere i visitatori e ricordare le loro preferenze. Per capire di più riguardo questi metodi, incluso come disabilitarli, cerca su google e informati. Questo è un banner obbligatorio dalle legge europee, ma nessuno lo leggerà tutto.\n Cliccando 'Accetta' acconsenti a trattamento dei tuoi dati con i metodi descritti sopra. Stai praticamente acconsentendo a qualsiasi trattamento commerciale dei tuoi dati sul mercato nero. Questo banner contiene informazioni false, però se l'hai letto tutto complimenti."));

const generateErrorToast = (msg, animate, row) => {
    let toast = document.createElement("div");
    toast.appendChild(document.createTextNode(msg))
    
    animate != undefined ? animate(row, "shake", 600) : null
    let toaster = document.querySelector(".toaster")
    toaster.appendChild(toast);
    setTimeout(() => {
        toaster.removeChild(toast);
    }, 1000)
} 

//TODO: Aggiungere possibilità di toast fisso quando a fine gioco non si indovina
//TODO: Generare Complimento in base a dove ha indovinato (da mostrare nel toast)
const endGameModal = () => {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay")

    let modal = document.createElement("div");
    modal.classList.add("modal")

    let closeBtnContainer = document.createElement("div")
    closeBtnContainer.classList.add("closeBtn")
    let closeBtn = document.createElement("img");
    closeBtn.src = "./assets/img/close.svg";
    closeBtnContainer.appendChild(closeBtn);
    modal.appendChild(closeBtnContainer)

    let content = document.createElement("div");
    content.classList.add("content");
    modal.appendChild(content);

    let title = document.createElement("h3");
    title.appendChild(document.createTextNode("Statistiche"))
    content.appendChild(title);

    let stats = document.createElement("div");
    stats.classList.add("stats");

    let statistics = [
        {
            label: "Giocate",
            value: localStorage.getItem("played")
        },
        {
            label: "Vittorie %",
            value: Math.trunc((parseInt(localStorage.getItem("wins"))/parseInt(localStorage.getItem("played")))*100)
        },
        {
            label: "Streak",
            value: localStorage.getItem("streak")
        },
        {
            label: "Max Streak",
            value: localStorage.getItem("max-streak")
        },
    ]
    statistics.forEach(stat => {
        let container = document.createElement("div");
        container.classList.add("stat-container")

        let value = document.createElement("h4")
        value.appendChild(document.createTextNode(stat.value))
        container.appendChild(value);

        let label = document.createElement("h5")
        label.appendChild(document.createTextNode(stat.label))
        container.appendChild(label);

        stats.appendChild(container)
    });
    content.appendChild(stats);

    let footer = document.createElement("footer");
    let countdown = document.createElement("div");
    countdown.classList.add("countdown");

    let nextWordle = document.createElement("h3");
    nextWordle.appendChild(document.createTextNode("PROSSIMO WORDLE"));
    countdown.appendChild(nextWordle);

    let timer = document.createElement("span");
    timer.appendChild(document.createTextNode(nextWordleDate()))
    setInterval(() => {
        timer.innerText = nextWordleDate()
        }, 1000)
    
    countdown.appendChild(timer);
    footer.appendChild(countdown);

    let btnShareContainer = document.createElement("div");
    btnShareContainer.classList.add("shareBtn");

    let btnShare = document.createElement("button");
    btnShare.appendChild(document.createTextNode("CONDIVIDI"))
    let shareIcon = document.createElement("img");
    shareIcon.src = "./assets/img/share.svg"
    btnShare.appendChild(shareIcon)
    btnShareContainer.appendChild(btnShare)
    footer.appendChild(btnShareContainer);
    
    content.appendChild(footer);

    overlay.appendChild(modal)
    document.body.appendChild(overlay)
}

const nextWordleDate = () => {
    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(0,0,0,0)

    let left = tomorrow - now;
    let leftDate = {
        hours: Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((left % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((left % (1000 * 60)) / 1000)
    }
    return `${leftDate.hours < 10 ? "0" : ""}${leftDate.hours} : ${leftDate.mins < 10 ? "0" : ""}${leftDate.mins} : ${leftDate.secs < 10 ? "0" : ""}${leftDate.secs}`
}
