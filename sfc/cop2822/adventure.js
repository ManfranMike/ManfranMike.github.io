var player = {
    health: 100,
    location: darkRoom,
    items: [lighter]
}

function look() {
    var text = "";

    text += "// " + player.location.namae + " //<br />";
    text += "&nbsp;" + player.location.desc + "";

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

function invalidCommand() {
    var text = "I'm sorry, I didn't understand that. Send HELP if you're stuck.";
    return text;
}

function help() {
    var text = "Only LOOK and INVENTORY or ITEMS works currently... More to come!";
    return text;
}