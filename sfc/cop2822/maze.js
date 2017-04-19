var l = 0;  //click counter on player
var hp = 3; //HP counter for player
var isF = false;    //True if player chose female
var isOver = false; //True when game is over by winning or dying
var d = new fateDeck(4);    //Array that holds map contents but not images
d.loadArray();  //generates the array

function fateDeck(size) {
    this.size = size;   //sets table size
    this.arr = [];  
    this.pi = 0;    //player row location
    this.pk = 0;    //player column location

    this.loadArray = function() {   //loops through the array populating player location, end location, pitfalls, and blank spaces
        var i, k, temp;
        var playerExists = false;  
        var endExists = false;

        for (i = 0; i <= this.size; i++) {
            this.arr[i] = [];
            for (k = 0; k <= this.size; k++) {
                if (i == 0 && playerExists == false && (k == this.size || Math.round(Math.random()))) { //If it's the first row AND there's no player AND either it's the last row or a 50% chance: Create player
                    temp = 1;
                    this.pi = i;
                    this.pk = k;
                    playerExists = true;
                }
                else if (i == this.size && endExists == false && (k == this.size || Math.round(Math.random()))) {   //Same as above but for determing end location.
                    temp = 2;
                    endExists = true;
                }
                else if (i > 0 && this.getChance())  // 20% chance of location beyond first row being a pitfall
                    temp = -1;
                else
                    temp = 0;   //All other locations are empty

                this.arr[i][k] = temp;
            }
        }
    }

    this.getChance = function() {   //Gets a 20% chance of being true
        var d = Math.random();
        if (d >= 0.7)
            return true;
        else
            return false;
    }
}

function clearMap() {   //clears the table html contents to be repopulated
    var i, k;
    for (i = 0; i <= d.size; i++) {
        for (k = 0; k <= d.size; k++) {
            document.getElementById("row" + i).innerHTML = "";
        }
    }
}

function loadImages(isFemale) { //loads images onto the table, and needs to know which character sprite to use
    

    var i, k;
    var row;
    var cellBG = "blank";
    var playerIMG;
    var endIMG = "star";
    var badIMG = "bad";
    var deadIMG = "dead";
    var winIMG = "win";

    if (isFemale) {
        playerIMG = "swordwoman";
        isF = true;
    }
    else
        playerIMG = "swordman";

    clearMap(); //clear map before adding html code

    for (i = 0; i <= d.size; i++) { //loop through each row
        row = document.getElementById("row" + i);

        for (k = 0; k <= d.size; k++) { //loop through each column for each row
            if (d.arr[i][k] == 1) { //If the location holds the player
                row.innerHTML += '<td><img src="images/' + playerIMG + '.svg" onclick="clickCount();"/></td>';
                d.pi = i;
                d.pk = k;
            }
            else if (d.arr[i][k] == -3) //If the location holds a corpse
                row.innerHTML += '<td><img src="images/' + deadIMG + '.svg" onclick="clickCount();"/></td>';
            else if (d.arr[i][k] == 3)  //If the location holds the successful player
                row.innerHTML += '<td><img src="images/' + winIMG + '.svg" onclick="clickCount();"/></td>';
            else if (d.arr[i][k] == 2)  //If the location holds the end location
                row.innerHTML += '<td><img src="images/' + endIMG + '.svg" onclick="savePlayer(' + i + ',' + k + ');"/></td>';
            else if (d.arr[i][k] == -2) //If the location holds a discovered pitfall
                row.innerHTML += '<td><img src="images/' + badIMG + '.svg" onclick="noWay();"/></td>';
            else if (d.arr[i][k] == -1) //If the location holds a hidden pitfall
                row.innerHTML += '<td><img src="images/' + cellBG + '.svg" onclick="hurtPlayer(' + i + ',' + k + ');"/></td>';
            else  //everywhere else is blank
                row.innerHTML += '<td><img src="images/' + cellBG + '.svg" onclick="movePlayer(' + i + ',' + k + ');"/></td>';
        }

    }

    document.getElementById("startmenu").innerHTML = "";    //Hide the character select
}

function noWay() {  //If the player tries to go back to a discovered pitfall, nothing happens
    if (hp > 0)
        document.getElementById("status").innerHTML = "You don't wanna go back there...";

    resetIfOver();
}

function clickCount() { //fun thing for clicking on the player too much
    l++;

    if (l >= 20 && l < 25)
        document.getElementById("status").innerHTML = "Cut it out...";
    else if (l >= 25 && l < 30)
        document.getElementById("status").innerHTML = "Seriously?...";
    else if (l >= 30 && l < 40)
        document.getElementById("status").innerHTML = "...";
    else if (l >= 40 && l < 50)
        document.getElementById("status").innerHTML = "There's no easter eggs here, if that's what you want...";
    else if (l >= 50 && l < 60)
        document.getElementById("status").innerHTML = "If you keep this up, I'll just end it all here, dude...";
    else if (l >= 60) {
        hp = 1;
        hurtPlayer(d.pi, d.pk);
        return 0;
    }
    else
        document.getElementById("status").innerHTML = "Clicked " + l + " times";


    resetIfOver();
}

function checkRange(row,col) {  //returns true if clicked space is close enough to the player for interaction, returns false otherwise
    var i = row;
    var k = col;
    var pi = d.pi;
    var pk = d.pk;

    var vd = Math.abs(i - pi);  //Find vertical distance cell clicked to player
    var hd = Math.abs(k - pk);  //find Horizontal Distance

    if (hp <= 0) {
        //document.getElementById("status").innerHTML = "That's too far away!";
        return -1;
    }


    if (vd <= 1 && hd <= 1)
        return true;
    else
        return false;
}

function movePlayer(row, col) { //Checks range, then moves the player to the new location if possible
    if (!checkRange(row, col) && checkRange(row, col) != -1 && !isOver) {
        document.getElementById("status").innerHTML = "That's too far away!";
        return 0;
    }
    else if (checkRange(row, col) == -1) {
        resetIfOver();
        return 0;
    }

    d.arr[row][col] = 1;    //Change clicked tile to player
    d.arr[d.pi][d.pk] = 0;  //Replace the old player with a blank

    document.getElementById("status").innerHTML = "Get to the Star!";
    loadImages(isF);
    resetIfOver();
}

function hurtPlayer(row, col) { //check range then damage player if needed
    if (!checkRange(row, col) && checkRange(row, col) != -1) {
        document.getElementById("status").innerHTML = "That's too far away!";
        return 0;
    }
    else if (checkRange(row, col) == -1)
        return 0;

    d.arr[row][col] = -2;   //Change blank space into visible pitfall
    hp--;
    document.getElementById("hp").innerHTML = hp;   //display new health total
    document.getElementById("status").innerHTML = "Ouch! Not that way!";

    if (hp <= 0) {
        d.arr[d.pi][d.pk] = -3; //Set player location as corpse location. Removing player and making game unplayable.
        isOver = true;
        document.getElementById("status").innerHTML = "You Have Died...";
        loadImages(isF);
        return 0;
    } 

    
    loadImages(isF);
    resetIfOver();
}

function savePlayer(row, col) { //check range, then move player and check win condition
    if (!checkRange(row, col) && checkRange(row, col) != -1) {
        document.getElementById("status").innerHTML = "That's too far away!";
        return 0;
    }
    else if (checkRange(row, col) == -1)
        return 0;

    d.arr[row][col] = 3;    //change star to win image and make player nonexistant
    d.arr[d.pi][d.pk] = 0;

    isOver = true;
    document.getElementById("status").innerHTML = "You have ascended from the dungeon!";
    loadImages(isF);
}

function resetIfOver() {    //After death or win, reset the game when this is triggered (typically by clicking anything else)
    if (isOver) {
        alert("Your game is over! The page will now refresh.");
        isOver = false;
        location.reload();
        return 0;
    }
    else
        return 0;
}