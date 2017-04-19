var player = {
    health: 100,
    location: darkRoom,
    items: [lighter]
}

function look() {
    var text = "";

    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].lit)
            player.lit = true;
    }

    text += "// " + player.location.namae() + " //<br />";
    text += "&nbsp;" + player.location.desc() + "";

    return text;
}

function checkInventory() {
    var text = "";

    if (player.items.length <= 0) {
        text += "You are holding nothing</p>"
        return text;
    }

    text += "You are holding " + player.items[0].namae;
    for (var i = 1; i < player.items.length; i++) {
        text += ", " + player.items[i].namae;
    }

    text += "";
    return text;
}

function move(dir) {

}

function invalidCommand() {
    var text = "I'm sorry, I didn't understand that. Send HELP if you're stuck.";
    return text;
}

function help() {
    var text = "You can type a VERB or a VERB and a NOUN. ";
    return text;
}

function examine(x) {
    var text;
    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x)
            text = player.items[i].desc;
    }

    if (!text)
        text = "You cannot see " + x + ".";
    return text;
}

function use(x){
    var text;
    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x)
            text = player.items[i].use();
    }

    if (!text)
        text = "You cannot see " + x + ".";
    return text;
}