function Room(namae,desc,items) {
    this.namae = namae;
    this.desc = desc;
    this.items = items;
}

function Item(id,namae,desc) {
    this.id = id;
    this.namae = namae;
    this.desc = desc;
}

function Door(desc,open,locked) {
    this.desc = desc;
    this.isOpen = open;
    this.isLocked = locked;
    this.status = function () {
        var str;
        if (this.isOpen)
            str = "an open";
        else
            str = "a closed";
        return str;
    };
}

//ROOMS
var darkRoom = new Room(
    function () {
        if (player.lit)
            return "A Lit Room";
        else
            return "A Dark Room";
    },
    function () {
        if (player.lit) {
            var str = "You are in a small room. The walls are made of stone and there are no windows.";
            str += " To the NORTH you can see a wooden door.";
            return str;
        }
        else
            return "You can't see anything.";
    },
    []
);

//ITEMS
var lighter = new Item(
    "lighter",
    "a wind-resistant lighter",
    "It has the letter 'G' etched into the metal casing."
);
lighter.lit = false;
lighter.use = function () {
    var text;
    if (lighter.lit) {
        text = "You shut the lighter. It's flame is extinguished.";
        lighter.lit = false;
    }
    else {
        text = "You flick the lighter open. It's flame flickers steadily.";
        lighter.lit = true;
    }
    return text;
};

var compass = new Item(
    "compass",
    "a compass",
    "It is pointing North."
);
