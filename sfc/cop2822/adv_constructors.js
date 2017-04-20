/*
    Constructors for gameObject types and the player.
*/

function gameObject(id, namae, desc) {
    this.id = id;        //Unique id for searching
    this.namae = namae;     //name for listing inventories
    this.desc = desc;      //Description when examined

    this.update;

//USE (object)
    this.use = function () {
        return "Nothing happens.";
    };
//USE (pickup) ON (object)
    this.useOn = function (x) {
        return "You cannot use" + this.id + " on " + x + ".";
    };
//EXAMINE (object)
    this.examine = function () {
        return this.desc;
    };
//TALK TO (object)
    this.talk = function () {

    };
//OPEN (container/door)
    this.openUp = function () {
        return "You can't open that.";
    };
//READ (object)
    this.read = function () {

    };
//ATTACK (object) *WITH (pickup)*
    this.attack = function () {

    };
//EAT (object)
    this.eat = function () {
        return "You decide not to eat the " + this.id +".";
    };
//TIE (object) TO (object) *WITH ROPE*
    this.tieTo = function () {

    };
//KILL SELF WITH (object)
    this.suicide = function () {

    };
//BREAK (object) *WITH (object)*
    this.break = function () {

    };
//DRINK (object)
    this.drink = function () {

    };
//SMELL (object)
    this.smell = function () {

    };
//LISTEN TO (object)
    this.listen = function () {

    };
}

function Room(id, namae, desc) {
    gameObject.call(this, id, namae, desc);

    this.inventory = [];

    this.load = function () {
        rooms.push(this);
    }
    this.load();
}

function PickUp(id, namae, desc) {
    gameObject.call(this, id, namae, desc);

    //Pickupables only:
    this.throw;   //THROW (pickup) *AT (object)*
    this.drop;      //DROP (pickup)
    this.putIn;     //PUT (pickup) IN (container)
    this.weild;     //WEILD (pickup)

    this.load = function () {
        pickups.push(this);
    }
    this.load();
}

function Equippable(id, namae, desc) {
    PickUp.call(this, id, namae, desc);

    //Equippables only:
    this.equip;
}

var player = {
  //Total HP
    hp: 100,
  //Current Room
    location: null,
  //Inventory
    items: [],
  //Equipment
    head: null,
    chest: null,
    legs: null,
    lHand: null,
    rHand: null,
    ring: null,
    neck: null,
  //Status Effects
    status: []
}