const getInput = () => {
    let input = document.querySelector('header input[type=text]').value;
    input = input.trim();
    const reg = new RegExp('[A-Za-z0-9 _]');
    console.log(reg.test(input))
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
    })
}

const fetchSearch = (query) => {

}
handleChange();
handleSubmit();