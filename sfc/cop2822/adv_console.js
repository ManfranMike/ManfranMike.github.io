/*
    This file covers anything that makes the console and input work.
*/

//Starts the flashing cursor for text, sets initial inventory and location, then presents opening quote.
function start() {
    setInterval(update, 500);
    player.location = darkRoom;
    player.items.push(lighter);
    document.getElementById("game").innerHTML += '"Paths are not always clear.<br /> &nbsp;To find one you must LOOK."';
}

function update() {
    flash(document.getElementById("cursor"));
}

function flash(x) {
    if (x.innerHTML == "&nbsp;")
        x.innerHTML = "_";
    else
        x.innerHTML = "&nbsp;";
}

// Gets ascii number of key pressed and converts it to the actual character.
function getKey(e) {
    var key;
    var input = document.getElementById("input");
    var game = document.getElementById("game");

    window.scrollTo(0, document.body.scrollHeight);    //Scroll the page on pressing enter.

    if (window.event) { // IE                    
        key = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                   
        key = e.which;
    }

    if (key == 8 || key == 46) {  //If Backspace or DEL is pressed, remove last character inputted
        input.innerText = input.innerText.replace(/(\s+)?.$/, "");
    }
    else if (key == 32)  //If space is pressed, add a space
        input.innerText += " ";
    else if (key == 13) {    //If enter is pressed, send the input, then clear box
        document.getElementById("game").innerHTML += "<p>>" + input.innerText + "</p>";
        game.innerHTML += submitCommand(input.innerText);
        input.innerText = "";
    }
    else if (key >= 65 && key <= 90)  //letters are added to box
        input.innerText += String.fromCharCode(key);
    else
        return false;   //everything else returns false
}