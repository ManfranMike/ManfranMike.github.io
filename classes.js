class Tech {
    constructor(t){
        this.id = t.id;
        this.name = t.name;
        this.desc = t.description;
        this.type = t.type;
        this.exp = t.expansion;
        this.total = t.quantity;
        this.qty = 0;
        this.bought = 0;
        
        this.isNext = 0;
        
        this.div = document.createElement("div");
        this.divIMG = document.createElement("img");
        this.divBadge = document.createElement("i");
        this.divNext = document.createElement("i");
        this.div.appendChild(this.divIMG);
        this.div.appendChild(this.divBadge);
        this.div.appendChild(this.divNext);
        this.updateDiv();
    }
    get quantity(){
        let q = this.qty - this.bought;
        return q;
    }
    
    get remaining(){
        let r = this.total - this.qty - this.isNext;
        return r;
    }
    
    get imageFile(){
        if (this.quantity <= 0){return "images/".concat(this.id,".png");}
        return "images/active/".concat(this.id,".png");
    }
    //get div(){return this.updateDiv();}
    
    get typeColor(){
        switch(this.type){
            case "Military":
                return "#7b4f50";
            case "Grid":
                return "#5c716c";
            case "Nano":
                return "#836d46";
            case "Rare":
                return "#7e718c";
            default:
                return "DimGrey";
        }
    }
    
    updateDiv(){
        //let div = document.createElement("div");
        this.div.setAttribute("class","w3-round-large w3-col s1 w3-display-container tech");
        this.div.setAttribute("id",this.id);
        this.div.onclick = function(){
            if(confirm("Buy this tech?")){
                buyTech(this.id);
            }
            return 1;
        }
        
        //let divIMG = document.createElement("img");
        this.divIMG.setAttribute("class","w3-image");
        this.divIMG.setAttribute("src",this.imageFile);
        //this.divIMG.setAttribute("onclick","");
        
        //let divBadge = document.createElement("i");
        this.divBadge.setAttribute("class","fa-solid fa-".concat(this.quantity," w3-display-bottomleft w3-margin techBadge"));
        
        this.divNext.setAttribute("class","fa-solid fa-hourglass w3-display-bottomright w3-margin");
        
        if (this.quantity >= 1){
            this.div.style.display = 'block';
            this.div.style.backgroundImage = 'linear-gradient(LightGrey,'.concat(this.typeColor,')');
            //this.div.style.outline = '2px solid LightGreen';
            this.divBadge.style.display = 'block';
        } else {
            this.div.style.backgroundImage = 'linear-gradient(DimGrey,'.concat(this.typeColor,')');
            this.divBadge.style.display = 'none';
        }
        
        if (this.isNext > 0){
            this.div.style.display = 'block';
            this.divNext.style.display = 'block';
        } else {this.divNext.style.display = 'none';}
        
        // if (this.bought > 0){
            // this.div.style.outline = '2px solid Red';
            // this.divNext.style.display = 'block';
        // } else {this.divNext.style.display = 'none';}
        
    }
    
    draw(n){this.qty += n;this.updateDiv();console.log("drawing",this.name);}
    buy(){this.bought += 1;this.updateDiv();console.log("bought",this.name);}
    refund(){this.bought -= 1;this.updateDiv();console.log("bought",this.name);}
    predict(n){this.isNext += n;this.updateDiv();console.log("predicting",this.name);}
}

class TechManager {
    constructor(id,techbox,players,options){
        this.id = id;
        this.techbox = techbox;
        this.types = ["Military","Grid","Nano","Rare"];
        this.div = document.getElementById(this.id);
        this.techBag = [];
        this.playerCount = players;
        this.options = options;
        
        this.nextButton = document.getElementById("predict");
        
        this.setup(this.playerCount,this.options);
        
    }
    
    get drawCount(){
        switch (this.playerCount){
            case 2:
            case "2":
                console.log("2 Players");
                return [12,4];
            case 3:
            case "3":
                console.log("3 Players");
                return [14,6];
            case 4:
            case "4":
                console.log("4 Players");
                return [16,7];
            case 5:
            case "5":
                console.log("5 Players");
                return [18,8];
            case 6:
            case "6":
                console.log("6 Players");
                return [20,9];
            case 7:
            case "7":
                console.log("7 Players");
                return [22,10];
            case 8:
            case "8":
                console.log("8 Players");
                return [24,11];
            case 9:
            case "9":
                console.log("9 Players");
                return [26,11];
            default:
                console.log("2 Players");
                return [12,4];
        }
    }
    
    makeRow(type){
        let row = document.createElement("div");
        row.setAttribute("class","w3-row");
        row.setAttribute("id",type);
        //console.log(type);
        
        return row;
    }
    
    setup(p,o){
        for (let i = 0, l = this.types.length; i<l; i++){
            this.div.appendChild(this.makeRow(this.types[i]));
        }
        
        this.techBag = this.fillBag(o);
        this.makeStandardTray();
    }
    
    fillBag(o){
        let is2Ebalance = o[0];
        let isRotA = o[1];
        let isSotR = o[2];
        let isTractorBeam = o[3];
        let is2ENew = o[4];
        let is2EDev = o[5];
        
        var techArray = [];
        
        for (let i = 0, l = this.techbox.length; i<l; i++){
            //console.log(techbox[i].id,techbox[i].type);
            if (this.techbox[i].expansion == "1E S" && is2Ebalance){console.log("Skip 1eb");continue;}
            if (this.techbox[i].expansion == "2E S" && !is2Ebalance){console.log("Skip 2eb");continue;}
            if (this.techbox[i].expansion == "RotA" && !isRotA){console.log("Skip rota");continue;}
            if (this.techbox[i].expansion == "SotF" && !isSotR){console.log("Skip sotr");continue;}
            if (this.techbox[i].expansion == "SP1" && !isTractorBeam){console.log("Skip tb");continue;}
            if (this.techbox[i].expansion == "2E T" && !is2ENew){console.log("Skip 2en");continue;}
            if (this.techbox[i].expansion == "2E D" && !is2EDev){console.log("Skip 2ed");continue;}
            
            let newTech = new Tech(this.techbox[i]);
            if (this.playerCount > 6 && newTech.type != "Rare"){newTech.total += 1;console.log("Adding extra tiles for high player count");}
            techArray.push(newTech);
        }
        
        return techArray;
    }
    
    makeStandardTray(){
        
        for (let i = 0, l = this.techBag.length; i<l; i++){
            //console.log(techbox[i].id,techbox[i].type);
            if (this.techBag[i].type == "Rare"){
                this.techBag[i].div.style.display = "none";
            }
            
            document.getElementById(this.techBag[i].type).appendChild(this.techBag[i].div);
            
        }
    }
    
    drawTech(){
        //console.log("drawing tech")
        var bag = this.techBag;
        
        for (var i = 0; i < bag.length; i++) {
            var tech = bag[i];
            if (tech.isNext > 0){
                let n = tech.isNext;
                tech.isNext = 0;
                tech.draw(n);
            }
        }
    }
    
    predictTech(n){
        //console.log("drawing tech")
        if (this.options[6]){this.drawTech()}
        
        for (var i = 0; i < n; i++){
            let randTech = this.getRandomTech();
            randTech.predict(1);
        }
        
        if (!this.options[6]){this.drawTech()}
    }
    
    getRandomTech(){
        var bag = this.techBag;
        var total = 0;
        for (var i = 0; i < bag.length; i++){total += bag[i].remaining}
        
        var rand = Math.random()*total;
        for (var i = 0; i < bag.length; i++) {
            var tech = bag[i];
            if (rand < tech.remaining){
                return tech;
            }
            rand -= tech.remaining;
        }
        
    }
    
    buyTech(id){
        var bag = this.techBag;
        
        for (var i = 0; i < bag.length; i++){
            var tech = bag[i];
            if (tech.id == id && tech.bought < tech.qty){return tech.buy();}
        }
    }
    
    refundTech(id){
        var bag = this.techBag;
        
        for (var i = 0; i < bag.length; i++){
            var tech = bag[i];
            if (tech.id == id && tech.bought > 0){return tech.refund();}
        }
    }
}