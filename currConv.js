const base = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const options = document.querySelectorAll("form select");
let btn = document.querySelector("#btn");
let fromInp = document.querySelector("#boxF");
let toInp = document.querySelector("#boxT");
let selectFr = document.querySelector("#from");
let selectTo = document.querySelector("#to");
let firstBox = document.querySelector("#firstBox");
let secBox = document.querySelector("#secBox");

//TO CREATE OPTION ELEMENTS(DROPDOWN) AND FLOOD THEM WITH CURRENCY CODES
for(let opt of options) {
    for(code in currency) {
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        opt.append(option);
//SET DEFAULT OPTIONS FOR DROPDOWNS
        if(opt.id === "from" && code === "INR") {
            option.selected = "selected";
        }
        if(opt.id === "to" && code === "USD") {
            option.selected = "selected";
        }
    }
    opt.addEventListener("change" , (evt)=>{//FLAG CHANGE EVENT LISTENER
        flagUpdate(evt.target);
    });
}

const flagUpdate = (event) => {//FLAG CHANGE FUNCTION
    let currCode = event.value;
    let contCode = currency[currCode];
    let img = event.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${contCode}/flat/32.png`;
}

btn.addEventListener("click" , async (evt) => {//BUTTON AND EXCHANGE VALUE FUNCTION
    evt.preventDefault();
        let fromAmt = fromInp.value;
        let fromSelct = selectFr.value;
        let toSelct = selectTo.value;

        //USING JAVASCRIPT METHOD TO SHOW COUNTRY NAME AND ITS CURRENCY
        const regionNames = new Intl.DisplayNames(
            ['en'], {type: 'region'}
          );
          firstBox.innerText = `${fromSelct} - ${regionNames.of(currency[fromSelct])}`;
          secBox.innerText = `${toSelct} - ${regionNames.of(currency[toSelct])}`;

        const URL = `${base}/${fromSelct.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromSelct.toLowerCase()][toSelct.toLowerCase()];

        let exchange = fromAmt*rate;
        toInp.value = exchange;
});