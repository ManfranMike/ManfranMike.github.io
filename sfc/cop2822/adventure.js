/*
    All the functions that occur from the translated user input
*/

function invalidCommand() {
    var text = "I'm sorry, I didn't understand that. Send HELP if you're stuck.";
    return text;
}

function help() {
    var str = "Try these commands:<br />";
    str += "LOOK<br />INVENTORY<br />EXAMINE<br />USE<br />TAKE<br />OPEN<br />HELP"
    return str;
}

function look() {
    var str;

    console.log("updated2");
    for (var i = 0; i < player.items.length || i < player.location.inventory.length; i++) {
        if ((player.items[i] && player.items[i].lit) || (player.location.inventory[i] && player.location.inventory[i].lit))
            player.lit = true;
        else
            player.lit = false;
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
            return "You added the " + x + " to your inventory.";
        }
    }
    return "You can't do that.";
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

function go(x) {
    var temp = player.location;

    if (x.startsWith("n") && player.location.north != null)
        player.location = player.location.north;
    if (x.startsWith("s") && player.location.south != null)
        player.location = player.location.south;
    if (x.startsWith("w") && player.location.west != null)
        player.location = player.location.west;
    if (x.startsWith("e") && player.location.east != null)
        player.location = player.location.east;

    if (player.location == temp)
        return "You cannot go that way.";
    else
        return look();
}

function drop(x) {
    if (player.items.length <= 0)
        return "You have nothing to drop.";
    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == x) {
            player.location.inventory.push(player.items[i]);
            player.items.splice(i, 1);
            return "You dropped " + x + " onto the floor.";
        }
    }
    return "You can't do that.";
}

function search(key, player, room, objects) {


    for (var i = 0; i < player.items.length; i++) {
        if (player.items[i].id == key)
            return player.items[i];
    }
}