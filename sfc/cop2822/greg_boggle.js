var isPlaying = false;
var isDone = false;
var t = 119;
var refID;
var x;
var words = getWords();

// Is called each function inside each time update is called. Countdown always happens last.
function update(){
    


    countdown();
}

// Starts interval on first presses, stops on second, and refreshes page on third.
function startGame(startButton) {
    x = startButton;
    if (isDone) {
        location.reload();
    }
    else if (isPlaying) {
        clearInterval(refID);
        x.innerHTML = "Reset Game"
        isDone = true;
    }
    else if (!isPlaying) {
        isPlaying = true;
        setWords(words);
        refID = setInterval(update, 1000);
        x.innerHTML = "Quit Game";
    }
}

// Counts down the timer, changes the visible timer, and presses quit if time runs out.
function countdown() {
    var timer = document.getElementById("timer");
    timer.innerHTML = t;
    if (t-- <= 0) {
        startGame(x);
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
    var i;

    for (i = 0; i < document.getElementById("bogglegame").rows[1].cells.length; i++) {
        document.getElementById("bogglegame").rows[1].cells[i].innerHTML = scramble[i];
    }

}