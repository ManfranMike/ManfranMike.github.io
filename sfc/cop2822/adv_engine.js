/*
    This is just for the switch case to decipher user input.
*/

function submitCommand(x) {
    var command = x.toLowerCase().split(" ");
    switch (command[0]) {
        case "open":
            return openUp(command[1]);
        case "pick":
            if (command[1] == "up")
                command[1] = command[2];
            else
                return "Try TAKE or PICK UP then the noun."
        case "take":
            return take(command[1]);
        case "examine":
            if (command[1] != "room") {
                return examine(command[1]);
            }
        case "look":
            if (command[1] == "at" && command[2] != "room") {
                return examine(command[2]);
            }
        case "l":
            return look();
        case "inventory":
        case "items":
        case "i":
            return checkInventory();
        case "help":
            return help();
        case "use":
            return use(command[1]);
        default:
            return invalidCommand();
    }
}