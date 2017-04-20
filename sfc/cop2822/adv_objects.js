/*
    This file will hold all the items, objects, and rooms that can be interacted with in the game.
*/

var moves = 0,
    score = 0;

//ARRAYS
var pickups = [];
var rooms = [];

//PICKUPS
var lighter = new PickUp("lighter", "a wind-resistant lighter", "It has the letter 'G' etched into the metal casing.");
lighter.lit = false;
lighter.use = function () {
    var str;
    if (this.lit) {
        str = "You shut the lighter. It's flame is extinguished.";
        this.lit = false;
        this.desc = this.desc.replace(" It's flame flickers steadily.", "");
    }
    else {
        str = "You flick the lighter open. It's flame flickers steadily.";
        this.lit = true;
        this.desc += " It's flame flickers steadily.";
    }
    return str;
}

var compass = new PickUp("compass", "a small compass", "It always points NORTH. There is the letter 'G' engraved on the bottom.");
compass.use = function () {
    return "It's pointing NORTH.";
}

//DOORS
var snakeDoor = new gameObject("door", "a metal door", "A thick metal door. There is a small keyhole under the door handle. Tiny drawings of snakes surround the keyhole.");
snakeDoor.openUp = function () {
    return "It's locked";
}

//ROOMS
var darkRoom = new Room("darkroom", "A Dark Room", "You can't see anything.");
darkRoom.update = function () {
    if (player.lit) {
        this.namae = "A Lit Room";
        this.desc = "You are in a small ROOM. The walls are made of slick metal and there are no windows.";
        this.desc += " To the NORTH you can see a wooden DOOR."
        if (this.inventory.length > 0) {
            this.desc += " There is ";
            for (var i = 0; i < this.inventory.length; i++) {
                this.desc += this.inventory[i].namae;
                if (i > 0)
                    this.desc += ", ";
            }
            this.desc += " on the floor.";
        }
    }
    else {
        this.namae = "A Dark Room";
        this.desc = "It's too dark to see anything."
    }
};
darkRoom.inventory = [compass];
darkRoom.objects = [snakeDoor];