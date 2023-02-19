//Variables
let modal = document.querySelector("#modal-container");
let modalText = document.querySelector("#winnertext");
let modalImage = document.querySelector("#winnerimg");
let span = document.querySelector("#close");
let startButton = document.querySelector("#startbutton")
let topText = document.querySelector("#top")
let currentRaceTime = 0;
let currentTimeRecord, finishLine;
let snails = [];
if (screen.width > 500){
    finishLine = 38;
}
else{
    finishLine = 22;
}

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
        snailToEdit.style.left = snails[i].left + "vw";
        if (screen.width > 1200){
            snailToEdit.style.top = snails[i].top + "vh";  
        }
        else{
            snailToEdit.style.top = (snails[i].top * 8) + "px";
        }
    }
}

//Starting the race
function start(){
    startButton.style.display = "none";
    startButton.innerText = "OMKAMP";

    for(i = 0; i < snails.length; i++){
        let currentSnail = document.getElementById(snails[i].id);
        snails[i].left += (Math.round((Math.random() * 2) + 5) / Math.round((Math.random() * 14) + 5));
        currentSnail.style.left = snails[i].left + "vw";

        if (snails[i].left >= finishLine){
            snails[i].racesWon += 1;
            setTimeout("gameOver('" + snails[i].name + "', '" + snails[i].icon + "')", 1000);
            break;
        }
        else if (i + 1 == snails.length){
            setTimeout("start();", 100);
            currentRaceTime += 1;
        }
    }
}

//Ending the game, is executed when a snail reaches the finish line
function gameOver(fastestSnail, snailImage){
    currentRaceTime = (currentRaceTime * 100) / 1000;

    modalText.innerText = "Ræset er slut og " + fastestSnail + " vandt! Det tog " + currentRaceTime.toFixed(1) + " sekunder";
    modalImage.src = snailImage;
    modal.style.display = "block";
    startButton.style.display = "block";

    if (currentRaceTime < currentTimeRecord || currentTimeRecord == undefined){
        currentTimeRecord = currentRaceTime;
        topText.innerHTML = "Hurtigste tid sat af " + fastestSnail + " på <br> " + currentRaceTime.toFixed(1) + " sekunder!";
    }

    for(i = 0; i < snails.length; i++){
        let currentSnail = document.getElementById(snails[i].id);
        currentSnail.style.left = "-34vw";
        currentSnail.innerHTML = '<p>' + snails[i].name + '<br>Points: ' + snails[i].racesWon +'</p>';
        snails[i].left = -34;
    }
}

//Close winner modal when clicking on the close button
span.onclick = function() {
    modal.style.display = "none";
}

//Closes the winner modal when the user clicks anywhere outside it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
