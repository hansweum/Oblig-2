
// hjelpevariable for både view og controller
const contentDiv = document.getElementById('content');

// model
let numbers = [7, 3, 1, 5, 8];
let chosenBar = 'ingen'; // Variabel for hvilken stolpe som er valgt
let inputValue = 1; // Variabel for hva som er skrevet i input-feltet
let inputValid = true; // Variabel for om inputen er gyldig

// view
show();

// function removeAllStyling(){
//     const rectangles = document.getElementsByTagName("rect") 
    
//     for (let i = 0; i < rectangles.length; i++) {
//         const elem = rectangles[i]
//         elem.style.stroke="";
//         elem.style.strokeWidth="";
//     }
// }

// function clicked(elem) {
//     const hasBeenClicked = elem == chosenBar;

//     // fjern all styling fra alle søyler
//     removeAllStyling();

//     if (hasBeenClicked) {
//         updateResult("ingen")
//         chosenBar=undefined
//     }  else {
//         elem.style.stroke="black";
//         elem.style.strokeWidth=1
//         chosenBar=elem
//         updateResult(elem.id)
//     }

//     if (chosenBar) {
//         enableButtons();
//     } else {
//         disableButtons();
//     }
// }
// function enableButtons(){
//     const removeButton = document.getElementById("remove")
//     removeButton.disabled=false
// }

// function disableButtons() {
//     const removeButton = document.getElementById("remove")
//     removeButton.disabled=true 
// }

// function updateResult(text) {
//     const result = document.getElementById("result")
//     result.innerHTML=text;
// }

function show() {
    let svgInnerHtml = '';
    for (let i = 0; i < numbers.length; i++) {
        svgInnerHtml += createBar(numbers[i], i + 1);
    }
    let buttonState = chosenBar != 'ingen' ? '' : 'disabled';
    let errorState = inputValid ? "hidden" : "";
    contentDiv.innerHTML = `
            <svg id="chart" width="500" viewBox="0 0 80 60">
                ${svgInnerHtml}
            </svg><br/>
            Valgt stolpe: <i id="result">${chosenBar}</i>
            <br />
            <div class="error ${errorState}">Feil! Du må skrive inn en verdi mellom 1 og 10, du skrev inn: "${inputValue}"</div>
            <br />
            Verdi:
            <input id="number" type="number" min="1" max="10" value="${inputValue}" />
            <button id="add" onclick="addBar()" >Legg til stolpe</button>
            <button id="change" onclick="changeBar()" ${buttonState}>Endre valgt stolpe</button><br />
            <button id="remove" onclick="deleteBar()" ${buttonState}>Fjerne valgt stolpe</button>
            `;
}

function createBar(number, barNo) {
    const width = 8;
    const spacing = 2;
    const x = (barNo - 1) * (width + spacing);
    const height = number * 10;
    const y = 60 - height;
    const color = calcColor(1, 10, barNo);

    const id = barNo;
    let barStyle = chosenBar === barNo ? 'stroke: black ' : ''
    return `<rect style="${barStyle}" width="${width}" height="${height}" onclick="clicked(${barNo})" id="${id}"
                            x="${x}" y="${y}" fill="${color}"></rect>`;
}

function calcColor(min, max, val) {
    const minHue = 240, maxHue = 0;
    const curPercent = (val - min) / (max - min);
    const colString = "hsl(" + ((curPercent * (maxHue - minHue)) + minHue) + ",100%,50%)";
    return colString;
}

// controller 
function validateInput(value) {
    var asNumeric = +value
    if (isNaN(asNumeric)) {
        inputValid = false;
        return false
    }
    inputValid = (asNumeric <= 10 && asNumeric >= 1);
    return inputValid
}

function clicked(barNo){
    chosenBar = barNo === chosenBar ? 'ingen' : barNo;
    show();
}

function addBar(){
    inputValue = document.getElementById("number").value;

    if (validateInput(inputValue)) {
        numbers.push(+inputValue);
    } 
    show();

   
}

function changeBar(){
    inputValue = document.getElementById("number").value;

    if (validateInput(inputValue)) {
        numbers[chosenBar-1]=+inputValue;
    } 
    show();

}

function deleteBar(){
    numbers.splice(chosenBar-1,1);
    show();
}
