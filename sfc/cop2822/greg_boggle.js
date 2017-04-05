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

// Is called each function inside each time update is called. Countdown always happens last.
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

}

// Set letter from bottom to leftmost top cell when clicked on.
function setLetter(x) {
    if (this.innerHTML == "&nbsp")  //If clicked square is blank, do nothing
        return false;

    // Cycle through the top row, if it's blank, fill it in then break the loop, else do nothing.
    for (i = 0; i < document.getElementById("bogglegame").rows[0].cells.length; i++) {
        if (document.getElementById("bogglegame").rows[0].cells[i].innerHTML == "&nbsp;") {
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
        if (document.getElementById("bogglegame").rows[0].cells[i].innerHTML != "&nbsp;") {
            str[i] = document.getElementById("bogglegame").rows[0].cells[i].innerHTML;
        }
    }

    return str;
}

// Clears top cells back to blank
function clearTopCells() {
    for (i = 0; i < document.getElementById("bogglegame").rows[0].cells.length; i++) {
        document.getElementById("bogglegame").rows[0].cells[i].innerHTML = "&nbsp;";
    }
}

// Re-enables bottom cells, loads top row cells that aren't empty into a string var, clears top row back to &nbsp;
function submitWord() {
    enableDisabled();
    subWords.push(loadString());
    clearTopCells();
}

// Check submitted words against array of valid words
function checkWords(x,y) {
    var isMatch = false;

    for (i = 0; i <= x.length; i++) {
        isMatch = false;
        for (k = 1; k <= y.length; k++) {
            if (y[k] == x[i]) {
                isMatch = true;
                score++;
                goodWords.push(x[i]);
            }
        }
        if (!isMatch)
            badWords.push(x[i]);
    }
}

//Collection of functions that occur when game ends
function endGame() {
    checkWords(subWords, words);
    displayScore();
    displayGoodBadWords();
}

// Simply display score in the score location
function displayScore() {
    document.getElementById("score").innerHTML = score;
}

//Display good words on left and bad words on right;
function displayGoodBadWords() {
    var x = document.getElementById("goodwords");
    var y = document.getElementById("badwords");

    x.innerHTML = goodWords;

    for (i = 0; i <= goodWords.length; i++) {
        //x.innerHTML += "<p>" + goodWords[i] + "</p>";
    }
    for (i = 0; i <= badWords.length; i++) {
        y.innerHTML += "<p>" + badWords[i] + "</p>";
    }
}