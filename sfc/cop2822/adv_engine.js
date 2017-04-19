var moves = 0,
    score = 0;

function start() {
    setInterval(update, 500);
    submitCommand("LOOK");
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

function getKey(e) {
    var key;
    var input = document.getElementById("input");

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
        submitCommand(input.innerText);
        input.innerText = "";
    }
    else if (key >= 65 && key <= 90)  //letters are added to box
        input.innerText += String.fromCharCode(key);
    else
        return false;   //everything else returns false
}

function submitCommand(x) {
    var game = document.getElementById("game");
    var command = x.toLowerCase().split(" ");
    switch (command[0]) {
        case "examine":
            game.innerHTML += examine(command[1]);
            break;
        case "look":
        case "l":
            game.innerHTML += look();
            break;
        case "inventory":
        case "items":
            game.innerHTML += checkInventory();
            break;
        case "go":
            game.innerHTML += move(command[1]);
        case "help":
            game.innerHTML += help();
            break;
        case "use":
            game.innerHTML += use(command[1]);
            break;
        case "open":
            game.innerHTML += openAction(command[1]);
        default:
            game.innerHTML += invalidCommand();
            break;
    }
}