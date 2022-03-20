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
    
    animate(row, "shake", 600)
    let toaster = document.querySelector(".toaster")
    toaster.appendChild(toast);
    setTimeout(() => {
        toaster.removeChild(toast);
    }, 1000)
} 