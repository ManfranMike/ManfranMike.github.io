/*
    All the functions that occur from the translated user input
*/

function invalidCommand() {
    var text = "I'm sorry, I didn't understand that. Send HELP if you're stuck.";
    return text;
}

function help() {
    var str = "Try these commands:<br />";
    str += "LOOK<br />INVENTORY<br />USE<br />TAKE<br />OPEN<br />HELP"
    return str;
}

function look() {
    var str;

    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].lit)
            player.lit = true;
    }

    player.location.update();
    str = "// " + player.location.namae + " //<br />";
    str += "&nbsp;" + player.location.desc;
    return str;
}

function checkInventory() {
    var str = "You are carrying ";

    if (player.items.length <= 0) {
        str += "nothing"
        return str;
    }

    str += player.items[0].namae;
    for (var i = 1; i < player.items.length; i++) {
        str += ", " + player.items[i].namae;
    }

    str += ".";
    return str;
}

function use(x) {
    var str;
    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x)
            str = player.items[i].use();
    }

    if (!str)
        str = "You cannot use " + x + ".";
    return str;
}

function examine(x) {
    var str;
    if (x == "self")
        return "It's you!";

    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x)
            str = player.items[i].examine();
    }
    if (!str) {
        for (var i = 0; i < player.location.objects.length; i++) {
            if (player.location.objects[i].id == x)
                str = player.location.objects[i].examine();
        }
    }

    if (!str)
        str = "You cannot see " + x + ".";
    return str;
}

function take(x) {
    if (player.location.inventory.length <= 0)
        return "There is nothing to take.";
    for (var i = 0; i < player.location.inventory.length; i++) {
        if (player.location.inventory[i].id == x) {
            player.items.push(player.location.inventory[i]);
            player.location.inventory.splice(i, 1);
            return "You added the " + x + " to your inventory."
        }
        else
            return "You can't do that.";
    }
}

function openUp(x) {
    var str;
    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x)
            str = player.items[i].openUp();
    }
    if (!str) {
        for (var i = 0; i < player.location.objects.length; i++) {
            if (player.location.objects[i].id == x)
                str = player.location.objects[i].openUp();
        }
    }

    if (!str)
        str = "You can't open that.";

    return str;
}