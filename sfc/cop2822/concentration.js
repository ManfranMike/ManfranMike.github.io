//GLOBAL CONSTANTS
    //Card styles
var BACK = '<img src="images/concentration/0.svg"></img>',
    BACK_SRC = "images/concentration/0.svg";
    CARD_STYLE = "w3-hover-grey w3-border";
    //Difficulty Constants
var SIZE_E = 4,
    SIZE_N = 6,
    SIZE_H = 8;

//GLOBAL VARIABLES
    //Temporary variables (counters, etc)
var i, k, temp;
    //For determining game state (mostly under Start function)
var isPlaying = false,
    isDone = false,
    t = 119,
    refID,
    j;
    //Game specific stuff
var difSize;
var f;
var isRevealed = false,
    isChecking = false;
var r_temp;
var m = 0,  //Match counter
    a = 0,  //Attempt counter
    score = 0;  //Score container

//OBJECTS
function FateDeck() {
    this.size = difSize * difSize;
    this.deck = [];
    this.arr = [];

    this.loadDeck = function () {
        var s = this.size;

        for (i = 0, k = 1; i < s; i++, k++) {
            this.deck[i] = k;
            this.deck[++i] = k;
        }
    }

    this.setArray = function () {
        var j;
        for (i = 0, j = 0; i < difSize; i++) {
            this.arr[i] = [];
            for (k = 0; k < difSize; k++ , j++) {
                this.arr[i][k] = this.deck[j];
            }
        }
    }
}



//FUNCTIONS
function chooseDifficulty(x, s) {  //x is the element that was clicked
    var buttons = document.getElementById("difficulty").children;   //get number of buttons (child elements in difficulty div)
    var start = document.getElementById("startbut");
    difSize = s;

    //cycle through the difficulty options to disable the ones not clicked.
    for (i = 0; i < buttons.length; i++) {
        temp = buttons[i];   //Set temp to next button in list
        temp.setAttribute("onclick", "");   //disable onclick for each button

        // if button wasn't the one clicked, change to disabled style
        if (x != temp) {
            temp.className += " w3-disabled";
        }
        
    }
    x.className += " w3-red";   //set clicked element to color red

    start.className = start.className.replace(" w3-disabled", "");  //turn off disabled style for start button
    start.setAttribute("onclick", "startGame(this);");  //Enable start button to be clicked
}

// Starts interval on first presses, stops on second, and refreshes page on third.
function startGame(x) {
    j = x;
    if (isDone) {
        location.reload();
    }
    else if (isPlaying) {
        clearInterval(refID);
        endGame();
        j.innerHTML = "Reset Game";
        isDone = true;
        isPlaying = false;
    }
    else if (!isPlaying) {
        isPlaying = true;
        f = new FateDeck();
        f.loadDeck();
        f.deck = shuffle(f.deck);
        f.setArray();
        loadTable(difSize);
        refID = setInterval(update, 1000);
        j.innerHTML = "Quit Game";
    }
}

// each function inside is called each time update is called. Countdown always happens last.
function update() {
    if (m >= (difSize * difSize / 2)) {
        startGame(j);
    }


    countdown();
}

// Counts down the timer, changes the visible timer, and presses quit if time runs out.
function countdown() {
    var timer = document.getElementById("timer");
    timer.innerHTML = t;
    if (t-- <= 0) {
        startGame(j);
    }
}

function endGame() {
    score = Math.round(m * t / Math.floor(a / 2));

    alert("GAME OVER!\n\nYour score: " + score + "\n\nYou got " + m + " matches with " + a + " failed attempts with " + t + " seconds left.");
}

function loadTable(size) {
    var table = document.getElementById("table"),
        board = document.getElementById("board");
    var row, cell;

    table.setAttribute("style", "max-width: 30%;");

    for (i = 0; i < size; i++) {
        row = table.insertRow(i);
        for (k = 0; k < size; k++) {
            cell = table.rows[i].insertCell(k);
            cell.innerHTML = BACK;
            cell.className += CARD_STYLE;
            cell.setAttribute("onclick", "revealCard(this," + i + "," + k + ");");
            cell.setAttribute("style", "width: " + 100/size + "%;");
        }
    }


}

function revealCard(x, row, col) {
    if (isChecking)
        return false;

    if (!isRevealed) {
        r_temp = x;
        r_temp.children[0].src = "images/concentration/" + f.arr[row][col] + ".svg";
        isRevealed = true;
    }
    else if (isRevealed) {
        isChecking = true;
        x.children[0].src = "images/concentration/" + f.arr[row][col] + ".svg";
        checkMatch(x, r_temp);
    }
}

function checkMatch(x, y) {
    if (x.children[0].src == y.children[0].src) {
        m++;
        x.setAttribute("onclick", "");
        y.setAttribute("onclick", "");
        isRevealed = false;
        isChecking = false;
    }
    else {
        a++;
        setTimeout(function () { hideCards(x.children[0], r_temp.children[0]); }, 1000);
    }
}

function hideCards(x, y) {
    x.src = BACK_SRC;
    y.src = BACK_SRC;
    isRevealed = false;
    isChecking = false;
}

function shuffle(arr) {
    temp = null;

    for (i = arr.length - 1; i > 0; i--) {
        k = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }

    return arr;
}