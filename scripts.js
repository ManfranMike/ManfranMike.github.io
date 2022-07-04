var techcsv = `id,name,quantity,description,type,expansion
0,Neutron Bombs,5,You may destroy all the Population Cubes from the hex without rolling any dice.,Military,1E
1,Starbase,5,You may Build Starbases.,Military,1E
2,Plasma Cannon,5,You may Upgrade Plasma Cannon Ship Parts.,Military,1E
3,Phase Shield,4,You may Upgrade Phase Shield Ship Parts.,Military,1E
4,Advanced Mining,4,You may place Population Cubes in the Advanced Materials squares with your Colony Ships.,Military,1E
5,Tachyon Source,3,You may Upgrade Tachyon Source Ship Parts.,Military,1E
6,Plasma Missile,3,You may Upgrade Plasma Missile Ship Parts.,Military,1E S
7,Gluon Computer,3,You may Upgrade Gluon Computer Ship Parts.,Military,1E S
46,Gluon Computer (2e),3,You may Upgrade Gluon Computer Ship Parts.,Military,2E S
45,Plasma Missile (2e),3,You may Upgrade Plasma Missile Ship Parts.,Military,2E S
8,Gauss Shield,5,You may Upgrade Gauss Dhield Ship Parts.,Grid,1E
9,Improved Hull,5,You may Upgrade Improved Hull Ship Parts.,Grid,1E S
10,Fusion Source,5,You may Upgrade Fusion Source Ship Parts.,Grid,1E S
47,Fusion Source (2e),5,You may Upgrade Fusion Source Ship Parts.,Grid,2E S
48,Improved Hull (2e),5,You may Upgrade Improved Hull Ship Parts.,Grid,2E S
11,Positron Computer,4,You may Upgrade Positron Computer Ship Parts.,Grid,1E
12,Advanced Economy,4,You may place Population Cubes in the Advanced Money squares with your Colony Ships.,Grid,1E
13,Tachyon Drive,3,You may Upgrade Tachyon Drive Ship Parts.,Grid,1E
14,Antimatter Cannon,3,You may Upgrade Antimatter Cannon Ship Parts.,Grid,1E
15,Quantum Grid,3,"You receive two additional Influence Discs, placed immediately on your Influence Track.",Grid,1E
16,Nanorobots,5,You may Build one additional Ship or Structure.,Nano,1E
17,Fusion Drive,5,You may Upgrade Fusion Drive Ship Parts.,Nano,1E
18,Advanced Robotics,5,"You receive one additional Influence Disc, placed immediately on your Influence Track.",Nano,1E S
19,Orbital,4,You may Build Orbitals.,Nano,1E S
50,Orbital (2e),4,You may Build Orbitals.,Nano,2E S
49,Advanced Robotics (2e),5,"You receive one additional Influence Disc, placed immediately on your Influence Track.",Nano,2E S
20,Advanced Labs,4,You may place Population Cubes in the Advanced Science squares with your Colony Ships.,Nano,1E
21,Monolith,3,You may Build Monoliths.,Nano,1E
22,Artifact Key,3,You must take 5 Resources of one type for each Artifact on your hexes.,Nano,1E S
23,Wormhole Generator,3,"You may Explore, Influence and Move through a hex edge that has a Wormhole on just one side.",Nano,1E S
51,Wormhole Generator (2e),3,"You may Explore, Influence and Move through a hex edge that has a Wormhole on just one side.",Nano,2E S
52,Artifact Key (2e),3,You must take 5 Resources of one type for each Artifact on your hexes.,Nano,2E S
24,Antimatter Splitter,1,Allows you to split damage from Antimatter Cannons over several targets.,Rare,RotA
25,Neutron Absorber,1,Enemy Neutron Bombs have no effect.,Rare,RotA
26,Distortion Sheild,1,Enemy missiles get a –2 modifier to hit.,Rare,RotA
27,Cloaking Device,1,Opponents need two ships to pin each of your ships.,Rare,RotA
28,Point Defense,1,Allows you to fire your Cannons against incoming Missiles.,Rare,RotA
29,Conifold Field,1,Allows you to take Conifold Field Ship Parts.,Rare,RotA
30,Sentient Hull,1,Allows you to take Sentient Hull Ship Parts.,Rare,RotA
31,Interceptor Bay,1,Allows you to take Interceptor Bay Ship Parts.,Rare,RotA
32,Flux Missile,1,Allows you to take Flux Missile Ship Parts.,Rare,RotA
33,Zero-Point Source,1,Allows you to take Zero-Point Source Ship Parts.,Rare,RotA
34,Advanced Genetics,1,"Gives you the Evolution ability, 3 Mutagen Resources, and a production of 1 Mutagen / round.",Rare,SotF
35,Metasynthesis,1,You may place Population Cubes in any Advanced Population squares with your Colony Ships.,Rare,SotF
36,Soliton Cannon,1,Allows you to take Soliton Cannon Ship Parts.,Rare,SotF
37,Rift Cannon,1,Allows you to take Rift Cannon Ship Parts.,Rare,SotF
38,Transition Drive,1,Allows you to take Transition Drive Ship Parts.,Rare,SotF
39,Absorption Shield,1,Allows you to take Absorption Shield Ship Parts.,Rare,SotF
40,Tractor Beam,1,Your opponents cannot retreat from a battle against you.,Rare,SP1
41,Improved Logistics,1,Gain 1 additional Move Activation during each Move Action you take.,Rare,2E T
42,Pico Modulator,1,Gain 2 additional Upgrade Activations during each Upgrade Action you take.,Rare,2E T
43,Warp Portal (Tech),1,Immediately place the Warp Portal Tile on any of your controlled hexes. The Warp Portal connects to all other Warp Portals and is worth 1VP at the end of the game if controlled.,Rare,2E D
44,Ancient Labs (Tech),1,Immediately draw one Discovery Tile.,Rare,2E D`

var techObjects = $.csv.toObjects(techcsv);
var TechBoard;

var p = 5;
var o = [0,0,0,0,0,0,0,0]

function loadTechs(){
    TechBoard = new TechManager("TechBoard",techObjects,p,o);
    TechBoard.predictTech(TechBoard.drawCount[0]);
    //TechBoard.predictTech(TechBoard.drawCount[1]);
}

function buyTech(id){
    var bag = TechBoard.techBag;
    for (var i = 0; i< bag.length; i++){
        if (bag[i].id == id && bag[i].qty > bag[i].bought){
            console.log("buying",bag[i].name);
            bag[i].buy();
            
        }
    }
}

var slider = document.getElementById("playerCount");
var output = document.getElementById("playerCountOutput");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = p = this.value;
  console.log(p);
}

var drawButton = document.getElementById("draw");

drawButton.onclick = function(){
    if(confirm("Draw new tiles?")){
        TechBoard.predictTech(TechBoard.drawCount[1]);
    }
    return 1;
}

var startButton = document.getElementById("startButton");
var startMenu = document.getElementById("StartMenu");

startButton.onclick = function(){
    if(confirm("Start the Game with these settings?")){
        startMenu.style.display = "none";
        console.log(p);
        loadTechs();
    }
    return 1;
}

var checkbox0 = document.getElementById("2E S");
var checkbox1 = document.getElementById("RotA");
var checkbox2 = document.getElementById("SotR");
var checkbox3 = document.getElementById("SP1");
var checkbox4 = document.getElementById("2E T");
var checkbox5 = document.getElementById("2E D");
var checkbox6 = document.getElementById("PT");
var checkbox7 = document.getElementById("RC");

checkbox0.oninput = function(){
    if(this.checked){
        o[0] = this.value
    } else {o[0] = 0}
    console.log(o[0]);
}

checkbox1.oninput = function(){
    if(this.checked){
        o[1] = this.value
    } else {o[1] = 0}
    console.log(o[1]);
}

checkbox2.oninput = function(){
    if(this.checked){
        o[2] = this.value
    } else {o[2] = 0}
    console.log(o[2]);
}

checkbox3.oninput = function(){
    if(this.checked){
        o[3] = this.value
    } else {o[3] = 0}
    console.log(o[3]);
}

checkbox4.oninput = function(){
    if(this.checked){
        o[4] = this.value
    } else {o[4] = 0}
    console.log(o[4]);
}

checkbox5.oninput = function(){
    if(this.checked){
        o[5] = this.value
    } else {o[5] = 0}
    console.log(o[5]);
}

checkbox6.oninput = function(){
    if(this.checked){
        o[6] = this.value
    } else {o[6] = 0}
    console.log(o[6]);
}

checkbox7.oninput = function(){
    if(this.checked){
        o[7] = this.value
    } else {o[7] = 0}
    console.log(o[7]);
}



/*
function loadTechs(){
    for (let i = 0, l = techbox.length; i<l; i++){
            //console.log(techbox[i].id,techbox[i].type);
            if (techbox[i].expansion == "2E"){continue;}
            //if (techbox[i].type == "Rare"){continue;}
            
            addTechSlot(techbox[i]);
        }
}

function addTechSlot(tech){
    let id = tech.id;
    let type = tech.type;
    
    //console.log(id.concat(" ",type));
    
    const techDiv = document.createElement("div");
    techDiv.setAttribute("class","w3-round-large w3-col s1 w3-display-container tech");
    techDiv.setAttribute("status","inactive");
    if (type == "Rare") {techDiv.style.display = "none";}
    
    const techImg = document.createElement("img");
    techImg.setAttribute("src","images/".concat(id,".png"));
    techImg.setAttribute("class","w3-image");
    techImg.setAttribute("id",id);
    techImg.setAttribute("onclick","makeActive(".concat(id,")"));
    
    techDiv.appendChild(techImg);
    
    const rowDiv = document.getElementById(type);
    rowDiv.appendChild(techDiv);
}

function on(id) {
  document.getElementById(id).style.display = "block";
}

function off(id) {
  document.getElementById(id).style.display = "none";
}

function makeActive(id) {
  let tech = document.getElementById(id);
  tech.src = "images/active/".concat(id,".png");
  tech.setAttribute("onclick","makeInactive(".concat(id,")"));
  tech.parentElement.setAttribute("status","active");
  
  
  //on("infobox");
}

function makeInactive(id) {
  let tech = document.getElementById(id);
  tech.src = "images/".concat(id,".png");
  tech.setAttribute("onclick","makeActive(".concat(id,")"));
  tech.parentElement.setAttribute("status","inactive");
}*/