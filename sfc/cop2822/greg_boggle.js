var isPlaying = false;
var isDone = false;
var t = 119;
var refID;
var s, i, k;
var words = getWords();
var subWords = [];
var goodWords = [];
var badWords = [];
var score = 0;

// each function inside is called each time update is called. Countdown always happens last.
function update(){
    countdown();
}

// Starts interval on first presses, stops on second, and refreshes page on third.
function startGame(startButton) {
    s = startButton;
    if (isDone) {
        location.reload();
    }
    else if (isPlaying) {
        clearInterval(refID);
        endGame();
        s.innerHTML = "Reset Game";
        isDone = true;
        isPlaying = false;
    }
    else if (!isPlaying) {
        isPlaying = true;
        setWords(words);
        refID = setInterval(update, 1000);
        s.innerHTML = "Quit Game";
    }
}

// Counts down the timer, changes the visible timer, and presses quit if time runs out.
function countdown() {
    var timer = document.getElementById("timer");
    timer.innerHTML = t;
    if (t-- <= 0) {
        startGame(s);
    }
}

// Randomly selects a set of words for this round of play. 
function getWords() {
    var words;
    switch (Math.floor(Math.random() * 5)) {
        case 0:
            words = ["cenabo", "beacon", "bacon", "banco", "beano", "canoe", "ocean", "acne", "aeon", "bane", "bean", "bone", "cane", "cone", "ebon", "nabe", "once"];
            break;
        case 1:
            words = ["mienca", "anemic", "cinema", "iceman", "amice", "amine", "amnic", "anime", "manic", "minae", "mince", "acme", "acne", "amen", "amie", "amin", "cain","came","cane","cine","emic","mace","main","mane","mean","mica","mice","mien","mina","mine","name","nema","nice"];
            break;
        case 2:
            words = ["atdebe", "debate", "bated", "abed", "abet", "bade", "bate", "bead", "beat", "beet", "beta", "date", "debt", "deet", "teed"];
            break;
        case 3:
            words = ["oradfe", "fedora", "adore", "afore", "fader", "fared", "oared", "oread", "aero", "afro", "dare", "deaf", "dear", "doer", "dore", "fade", "fado","fard","fare","faro","fear","feod","fora","ford","fore","frae","froe","odea","orad","read","redo","road","rode"];
            break;
        case 4:
            words = ["selpae", "asleep", "elapse", "please", "easel", "lapse", "leaps", "lease", "pales", "peals", "pease", "peels", "peles", "pleas", "salep", "sepal", "sleep", "spale", "speel", "alee", "ales", "alps", "apes", "apse", "ease", "eels", "else", "laps", "lase", "leap", "leas", "lees", "pale", "pals", "pase", "peal", "peas", "peel", "pees", "pele", "plea", "sale", "salp", "seal", "seel", "seep", "slap","spae"];
            break;
        default:
            break;
    }

    return words;
}

// Applies the scrambled word to the table for the player to see.
function setWords(x) {
    var scramble = x[0].toUpperCase();

    for (i = 0; i < document.getElementById("bogglegame").rows[1].cells.length; i++) {
        document.getElementById("bogglegame").rows[1].cells[i].innerHTML = scramble[i];
    }

    document.getElementById("pos").innerHTML = words.length-1;
}

// Set letter from bottom to leftmost top cell when clicked on.
function setLetter(x) {
    if (!isPlaying)
        return false;
    
    // Cycle through the top row, if it's blank, fill it in then break the loop, else do nothing.
    for (i = 0; i < document.getElementById("bogglegame").rows[0].cells.length; i++) {
        if (document.getElementById("bogglegame").rows[0].cells[i].innerHTML == "_") {
            document.getElementById("bogglegame").rows[0].cells[i].innerHTML = x.innerHTML;
            x.className += " w3-disabled";
            return true;
        }
    }

    return false;
}

// Enable bottom row to be clickable
function enableDisabled() {
    for (i = 0; i < document.getElementById("bogglegame").rows[1].cells.length; i++) {
        document.getElementById("bogglegame").rows[1].cells[i].className = document.getElementById("bogglegame").rows[1].cells[i].className.replace(" w3-disabled", "");
    }
}

// Load top row cells into a string
function loadString() {
    var str = "";

    for (i = 0; i < document.getElementById("bogglegame").rows[0].cells.length; i++) {
        if (document.getElementById("bogglegame").rows[0].cells[i].innerHTML != "_") {
            str += document.getElementById("bogglegame").rows[0].cells[i].innerHTML;
        }
    }
    
    return str;
}

// Clears top cells back to blank
function clearTopCells() {
    for (i = 0; i < document.getElementById("bogglegame").rows[0].cells.length; i++) {
        document.getElementById("bogglegame").rows[0].cells[i].innerHTML = "_";
    }
}

// Re-enables bottom cells, loads top row cells that aren't empty into a string var, clears top row back to &nbsp;
function submitWord() {
    if (!isPlaying)
        return false;

    enableDisabled();
    checkWord(loadString());
    clearTopCells();
}

//Checks word passed against word list and adds it to the proper list
function checkWord(x) {
    for (i = 1; i < words.length; i++) {
        if (x == words[i].toUpperCase()) {
            words[i] = "0";
            document.getElementById("goodwords").innerHTML += "<p>" + x + "</p>";
            score++;
            displayScore();
            return true;
        }
    }
    document.getElementById("badwords").innerHTML += "<p>" + x + "</p>";
    return false;
}

//Collection of functions that occur when game ends
function endGame() {
    submitWord();
    displayScore();

    alert("GAME OVER!\n\nYour Final Score was " + score + " out of " + (words.length-1) +"!")
}

// Simply display score in the score location
function displayScore() {
    document.getElementById("score").innerHTML = score;
}