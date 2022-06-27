var techcsv = `id,name,quantity,description,type,expansion
0,Neutron Bombs,5,You may destroy all the Population Cubes from the hex without rolling any dice.,Military,1E
1,Starbase,5,You may Build Starbases.,Military,1E
2,Plasma Cannon,5,You may Upgrade Plasma Cannon Ship Parts.,Military,1E
3,Phase Shield,4,You may Upgrade Phase Shield Ship Parts.,Military,1E
4,Advanced Mining,4,You may place Population Cubes in the Advanced Materials squares with your Colony Ships.,Military,1E
5,Tachyon Source,3,You may UpgradeTachyon Source Ship Parts.,Military,1E
6,Plasma Missile,3,You may Upgrade Plasma Missile Ship Parts.,Military,1E
7,Gluon Computer,3,You may Upgrade Gluon Computer Ship Parts.,Military,1E
8,Gauss Shield,5,You may Upgrade Gauss Dhield Ship Parts.,Grid,1E
9,Improved Hull,5,You may Upgrade Improved Hull Ship Parts.,Grid,1E
10,Fusion Source,5,You may Upgrade Fusion Source Ship Parts.,Grid,1E
11,Positron Computer,4,You may Upgrade Positron Computer Ship Parts.,Grid,1E
12,Advanced Economy,4,You may place Population Cubes in the Advanced Money squares with your Colony Ships.,Grid,1E
13,Tachyon Drive,3,You may Upgrade Tachyon Drive Ship Parts.,Grid,1E
14,Antimatter Cannon,3,You may Upgrade Antimatter Cannon Ship Parts.,Grid,1E
15,Quantum Grid,3,"You receive two additional Influence Discs, placed immediately on your Influence Track.",Grid,1E
16,Nanorobots,5,You may Build one additional Ship or Structure.,Nano,1E
17,Fusion Drive,5,You may Upgrade Fusion Drive Ship Parts.,Nano,1E
18,Advanced Robotics,5,"You receive one additional Influence Disc, placed immediately on your Influence Track.",Nano,1E
19,Orbital,4,You may Build Orbitals.,Nano,1E
20,Advanced Labs,4,You may place Population Cubes in the Advanced Science squares with your Colony Ships.,Nano,1E
21,Monolith,3,You may Build Monoliths.,Nano,1E
22,Artifact Key,3,You must take 5 Resources of one type for each Artifact on your hexes.,Nano,1E
23,Wormhole Generator,3,"You may Explore, Influence and Move through a hex edge that has a Wormhole on just one side.",Nano,1E
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
41,Improved Logistics,1,Gain 1 additional Move Activation during each Move Action you take.,Rare,2E
42,Pico Modulator,1,Gain 2 additional Upgrade Activations during each Upgrade Action you take.,Rare,2E
43,Warp Portal (Tech),1,Immediately place the Warp Portal Tile on any of your controlled hexes. The Warp Portal connects to all other Warp Portals and is worth 1VP at the end of the game if controlled.,Rare,2E
44,Ancient Labs (Tech),1,Immediately draw one Discovery Tile.,Rare,2E
45,Plasma Missile (2e),3,You may Upgrade Plasma Missile Ship Parts.,Military,2E
46,Gluon Computer (2e),3,You may Upgrade Gluon Computer Ship Parts.,Military,2E
47,Fusion Source (2e),5,You may Upgrade Fusion Source Ship Parts.,Grid,2E
48,Improved Hull (2e),5,You may Upgrade Improved Hull Ship Parts.,Grid,2E
49,Advanced Robotics (2e),5,"You receive one additional Influence Disc, placed immediately on your Influence Track.",Nano,2E
50,Orbital (2e),4,You may Build Orbitals.,Nano,2E
51,Wormhole Generator (2e),3,"You may Explore, Influence and Move through a hex edge that has a Wormhole on just one side.",Nano,2E
52,Artifact Key (2e),3,You must take 5 Resources of one type for each Artifact on your hexes.,Nano,2E`

var techbox = $.csv.toObjects(techcsv);

function loadTechs(){
    for (let i = 0, l = techbox.length; i<l; i++){
            //console.log(techbox[i].id,techbox[i].type);
            if (techbox[i].expansion == "2E"){continue;}
            
            addTechSlot(techbox[i].id,techbox[i].type);
        }
}

function addTechSlot(id,type){
    console.log(id.concat(" ",type));
    
    const techDiv = document.createElement("div");
    techDiv.setAttribute("class",type.concat(" w3-round-large w3-col s1 w3-display-container tech"));
    
    const techImg = document.createElement("img");
    techImg.setAttribute("src","images/".concat(id,".png"));
    techImg.setAttribute("class","w3-image");
    
    techDiv.appendChild(techImg);
    
    const rowDiv = document.getElementById(type);
    rowDiv.appendChild(techDiv);
}

function createEmptyTray(){
    g = document.createElement('div');
    g.setAttribute("id","row1")
    g.setAttribute("class","w3-row")
    
}