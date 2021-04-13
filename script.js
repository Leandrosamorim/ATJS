class Card {
    constructor(back, front) {
        this.front = "img/cross.png";
        this.back = back;
    }
}

var files = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png", "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png"];
files.sort(() => .5 - Math.random());
var cards = files.map(x => x = new Card(x));
var timer;

async function createTable() {

    timer = new Date();
    for (let i = 0; i < files.length; i = i + 4) {
        document.getElementById("board").innerHTML += `
        <tr>
        <td><img class = "flip-card-inner" id = "${i}" src = ${cards[i].back} onclick = "OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 1}" src = ${cards[i + 1].back} onclick="OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 2}" src = ${cards[i + 2].back} onclick="OnClick(event)"></td>
        <td><img class = "flip-card-inner" id = "${i + 3}" src = ${cards[i + 3].back} onclick="OnClick(event)"></td>
        </tr>`;
    }
    await sleep(1000);
    for (let i = 0; i < cards.length; i++){
        var card = document.getElementById(i);
        card.src = cards[i].front;
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
            var audio = document.getElementsByTagName("audio")[0];
            audio.play();
            await sleep(3000)
            .then(() => { document.getElementById("screen").style.visibility = "hidden"; })
            await TurnCard(card1); 
            await TurnCard(card2);
        }
        if(card1 && card2){
            card1 = false;
            card2 = false;
        }

        if(document.getElementById("pts").innerHTML == "8"){
            var time = new Date();
            timer.setSeconds(time.getSeconds() - timer.getSeconds())
            alert("Parabens, voce venceu em "+ timer.getSeconds() + " segundos!")
            var audio = document.getElementsByTagName("audio")[0];
            audio.src = "audio/parabens.mp3"
            audio.play();
            
        }


    }
}


async function TurnCard(x) {
    console.log(x)
    var id = Number(x.id)
    x.style.transform += "rotateY(180deg)";
    if (x.src == "file:///C:/At/img/cross.png") {
        x.setAttribute("src", cards[id].back);
        x.onclick = null;
    }else{
        x.src = cards[id].front;
        x.setAttribute("onclick", "OnClick(event)");
    }

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

