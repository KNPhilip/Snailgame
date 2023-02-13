//Variables
let startButton = document.querySelector("#startbutton")
let topText = document.querySelector("#top")
let currentRaceTime = 0;
let currentTimeRecord;
let finishLine = 38;
let snails = [];

//Classes
class Snail{
    constructor(id, name, icon, racesWon, top, left){
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.racesWon = racesWon;
        this.top = top;
        this.left = left;
    }
}

//Functions
//Function to retrieve information in the GET method by name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Checks the snail names are set correctly and which snails are participating.
function validateSnails(){
    if (!getParameterByName("firstSnail").match(/^[A-Za-z]+$/) || !getParameterByName("firstSnail").match(/^[A-Za-z]+$/))
    {
        window.location.href = "index.html";
        alert("Navngiv mindst 2 af de første snegle (Noget ordenligt..)");
    }
    else{
        let firstSnail = new Snail("firstSnail", getParameterByName("firstSnail"), "img/snegl1.png", 0, -20, -34);
        let secondSnail = new Snail("secondSnail", getParameterByName("secondSnail"), "img/snegl2.png", 0, -7, -34);
        snails.push(firstSnail);
        snails.push(secondSnail);
        if (getParameterByName("thirdSnail") != ""){
            if (!getParameterByName("thirdSnail").match(/^[A-Za-z]+$/)){
                window.location.href = "index.html";
                alert("Navngiv den tredje snegl (Noget ordenligt..)");
            }
            else{
                let thirdSnail = new Snail("thirdSnail", getParameterByName("thirdSnail"), "img/snegl3.png", 0, 6, -34);
                snails.push(thirdSnail);
                if (getParameterByName("fourthSnail") != ""){
                    if (!getParameterByName("fourthSnail").match(/^[A-Za-z]+$/)){
                        window.location.href = "index.html";
                        alert("Navngiv den fjerde snegl (Noget ordenligt..)");
                    }
                    else{
                        let fourthSnail = new Snail("fourthSnail", getParameterByName("fourthSnail"), "img/snegl4.png", 0, 19, -34);
                        snails.push(fourthSnail);
                    }
                }
            }
        }
    }

    //For loop to create the snails in the HTML
    for(i = 0; i < snails.length; i++){
        document.querySelector("#raceway").innerHTML += '<div id="' + snails[i].id + '" class="snail-container"><p>' + snails[i].name + '<br>Points: ' + snails[i].racesWon +'</p></div>';

        let snailToEdit = document.getElementById(snails[i].id);
        snailToEdit.style.backgroundImage = "url('" + snails[i].icon + "')";
        snailToEdit.style.top = snails[i].top + "vh";
        snailToEdit.style.left = snails[i].left + "vw";
    }
}

//Starting the race
function start(){
    startButton.style.display = "none";
    startButton.innerText = "OMKAMP";

    for(i = 0; i < snails.length; i++){
        let currentSnail = document.getElementById(snails[i].id);
        let randomNumber = Math.round((Math.random() * 2) + 5);
        snails[i].left += (randomNumber / Math.round((Math.random() * 14) + 5));
        currentSnail.style.left = snails[i].left + "vw";

        if (snails[i].left >= finishLine){
            snails[i].racesWon += 1;
            console.log(snails[i].racesWon);
            setTimeout("gameOver('" + snails[i].name + "')", 1000);
            break;
        }
        else if (i + 1 == snails.length){
            setTimeout("start();", 100);
            currentRaceTime += 1;
        }
    }
}

//Ending the game, is executed when a snail reaches the finish line
function gameOver(fastestSnail){
    currentRaceTime = (currentRaceTime * 100) / 1000;
    if (fastestSnail == undefined){
        alert("Ræset blev uafgjort! Det tog " + currentRaceTime + " sekunder");
    }
    else{
        alert("Ræset er slut og " + fastestSnail + " vandt! Det tog " + currentRaceTime + " sekunder");
        if (currentRaceTime < currentTimeRecord || currentTimeRecord == undefined){
            currentTimeRecord = currentRaceTime;
            topText.innerText = "Hurtigste tid sat af: " + fastestSnail + " på " + currentRaceTime + " sekunder!";
        }
    }
    startButton.style.display = "block";
    for(i = 0; i < snails.length; i++){
        let currentSnail = document.getElementById(snails[i].id);
        currentSnail.style.left = "-34vw";
        currentSnail.innerHTML = '<p>' + snails[i].name + '<br>Points: ' + snails[i].racesWon +'</p>';
        snails[i].left = -34;
    }
}