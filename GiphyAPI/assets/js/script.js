const getInput = () => {
    let input = document.querySelector('header input[type=text]').value;
    input = input.trim();
    const reg = new RegExp('[A-Za-z0-9 _]');
    if(input === "" || input == undefined || input.includes("\\") || input.includes("\\") || !reg.test(input)){
        error("Ricerca non valida");
    }else{
        return input;
    }
}

const error = (msg) => {
    let input = document.querySelector('header input[type=text]');
    input.classList.add('error');
    if(!input.parentNode.querySelector("span")){
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(msg));
        input.parentNode.insertBefore(span, input);
    }
}

const removeError = () => {
    let input = document.querySelector('header input[type=text]');
    input.classList.remove('error');
    let span = document.querySelector("header .title span");
    if(span){
        span.remove();
    }
}

const handleChange = () => {
    let input = document.querySelector('header input[type=text]');
    input.addEventListener("keyup", (e) => {
        if(e.keyCode != 13){
            removeError()
        }        
    })
}
const handleSubmit = () => {
    let form = document.querySelector("header form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let string = getInput();
        if(string){
            fetchSearch(string);
        }
    })
}

const fetchSearch = (query, trigger="search") => {
    fetch(createUrl(query))
    .then(r => r.json())
    .then(r => {
        if(trigger.toLowerCase() == "search" || trigger == 1){
            let gifContainer = document.createElement("section")
            gifContainer.id = "gifContainer";
            r.data.forEach(gif => gifContainer.appendChild(createGif(gif)))
            document.querySelector(".mainContainer").appendChild(gifContainer)
        }
    })
    .catch(e => {
        error("Impossibile connettersi")
        console.error(e)
    })
}

const createUrl = (q, type="search", offset=0, lang="it") => {
    let apiKey = "oGlvUNafpUXj5mqF0LgKCE52tnh3colT";
    if(type.toLowerCase() == "search" || type == 1){
        return `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&offset=${offset}&lang=${lang}`
    }else{
        return `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`
    }
}

const createGif = (gif) => {
    let gifContainer = document.createElement("div");
    gifContainer.classList.add("gif")
    gifContainer.href = gif.url;
    //Gif
    let img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;
    gifContainer.appendChild(img)
    
    //Details
    let infoDiv = document.createElement("div")
    infoDiv.classList.add("info")

    let title = document.createElement("h2");
    title.appendChild(document.createTextNode(gif.title))
    infoDiv.appendChild(title)

    if(gif.user != undefined){
        let user = document.createElement("a")
        user.href = gif.user.profile_url
        user.appendChild(document.createTextNode(gif.user.display_name))
        infoDiv.appendChild(user)
    }
    gifContainer.appendChild(infoDiv)

    //Actions
    let iconsContainer = document.createElement("div")
    iconsContainer.classList.add("icons")
    iconsContainer.appendChild(generateIcon("./assets/img/icons/link.svg", "copyLink"))
    iconsContainer.appendChild(generateIcon("./assets/img/icons/embed.svg", "embedGif"))
    gifContainer.appendChild(iconsContainer)
    
    return gifContainer;
}

const generateIcon = (src, action) => {
    let img = document.createElement("img");
    img.src = src;
    img.alt = action;
    img.dataset.action = action
    return img;
}
handleChange();
handleSubmit();