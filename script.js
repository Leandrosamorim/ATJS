class Card {
    constructor(back, front) {
        this.front = "img/cross.png";
        this.back = back;
    }
}

var files = ["img/android.png", "img/chrome.png", "img/facebook.png", "img/firefox.png", "img/googleplus.png", "img/html5.png", "img/twitter.png", "img/windows.png", "img/android.png", "img/chrome.png", "img/facebook.png", "img/firefox.png", "img/googleplus.png", "img/html5.png", "img/twitter.png", "img/windows.png"];
files.sort(() => .5 - Math.random());
var cards = files.map(x => x = new Card(x))

function createTable() {

    for (let i = 0; i < files.length; i = i + 4) {
        document.getElementById("board").innerHTML += `
        <tr>
        <td><img class = "flip-card-inner" id = "${i}" src = ${cards[i].front} onclick = "OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 1}" src = ${cards[i + 1].front} onclick="OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 2}" src = ${cards[i + 2].front} onclick="OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 3}" src = ${cards[i + 3].front} onclick="OnClick(event)"></td>
        </tr>`;
    }
    document.getElementById("start").style.visibility = "hidden";
}

var card1;
var card2;
let pts = 0;
async function OnClick(event) {
    if (!card1) {
        card1 = event.srcElement;
        await TurnCard(card1);
    } else {
        card2 = event.srcElement;
        await TurnCard(card2)

        if ((files[card1.id] == files[card2.id]) && card1 != card2) {
            pts++
            document.getElementById("pts").innerHTML = pts;

        } else {
            document.getElementById("screen").style.visibility = "visible";
            await sleep(1000)
            .then(() => { document.getElementById("screen").style.visibility = "hidden"; })
            .then(() => {TurnCard(card1); TurnCard(card2);}) 
        }
        if(card1 && card2){
            card1 = false;
            card2 = false;
        }


    }
}


async function TurnCard(x) {
    console.log(x)
    var id = Number(x.id)
    x.style.transform += "rotateY(180deg)";
    if (document.getElementById(x.id).src == "file:///C:/Users/Leandro/Documents/Infnet/TPS/JavaScript/At/img/cross.png") {
        x.src = cards[id].back;
        x.onclick = "";
    }else{
        document.getElementById(x.id).src = cards[id].front;
        x.onclick = "OnClick(event)";

    }

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

