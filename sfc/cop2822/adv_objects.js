function Room(namae,desc,items) {
    this.namae = namae;
    this.desc = desc;
    this.items = items;

    //Exits
    /*this.nw = nw
    this.n = n;
    this.ne = ne;
    this.w = w;
    this.e = e;
    this.sw = sw;
    this.s = s;
    this.se = se;*/
}

function Item(namae,desc) {
    this.namae = namae;
    this.desc = desc;
}

function Door() {
    this.isOpen = open;
    this.isLocked = locked;
}

//ROOMS
var darkRoom = new Room(
    "A Dark Room",
    "You can't see anything.",
    []
);

var litRoom = new Room(
    "A Lit Room",
    function () {
        var str;
        str = "You are in a small dimly lit room. The walls are made of stone.";
        return str;
    },
    []
);


//ITEMS
var lighter = new Item(
    "a lighter",
    "It has the letter 'G' etched into the metal casing."
);

var compass = new Item(
    "a compass",
    "It is pointing North."
);

//DOORS
litRoom.door = new Door(false,true);