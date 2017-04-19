var moves = 0,
    score = 0;

function start() {
    setInterval(update, 500);
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
    var keynum;
    var input = document.getElementById("input");

    if (window.event) { // IE                    
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                   
        keynum = e.which;
    }

    if (keynum == 8 || keynum == 46) {  //If Backspace or DEL is pressed, remove last character inputted
        input.innerText = input.innerText.replace(/(\s+)?.$/, "");
    }
    else if (keynum == 32)  //If space is pressed, add a space
        input.innerText += " ";
    else if (keynum == 13) {    //If enter is pressed, send the input, then clear box
        document.getElementById("game").innerHTML += "<p>>" + input.innerText + "</p>";
        submitCommand();
        input.innerText = "";
    }
    else if (keynum >= 65 && keynum <= 90)  //letters are added to box
        input.innerText += String.fromCharCode(keynum);
    else
        return false;   //everything else returns false
}

function submitCommand() {
    moves++;

}