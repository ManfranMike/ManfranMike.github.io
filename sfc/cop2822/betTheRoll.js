//Player object to hold values for each player
function Player(){
 this.d1 = -1; //values of -1 are a code failure
 this.d2 = -1;
 this.tot = -1;
 this.points = 0;
 this.wager = -1;
 this.wallet = 50;
 
 // Get rolls with Player.roll
 this.roll = function(){
  this.d1 = getRoll();
  this.d2 = getRoll();
  this.tot = this.d1 + this.d2;
 }
 
 //compare rolls with Player1.fight(Player2)
 this.fight = function(p2){
   var result = -1; 
        //-1 = code failure, 
        // 0 = tie, 
        // 1 = p1 wins, 
        // 2 = p2 wins
   
   if (this.tot > p2.tot || (this.tot == p2.tot && this.d1 == this.d2 && p2.d1 != p2.d2))
       result = 1;
   else if (this.tot < p2.tot || (this.tot == p2.tot && this.d1 != this.d2 && p2.d1 == p2.d2))
       result = 2;
   else if (this.tot == p2.tot)
       result = 0;
   else
       result = -1;
   
   return result;
 } 
 
}

//function to roll each die when it needs rolling
function getRoll(){
 var roll = Math.floor(Math.random()*6)+1;
 return roll;
}

// Prompts for a wager between 5 and the player's wallet total. Loops until a valid input.
function getWager(p1){
	var wager;
	var isValid;
	
	do{
	wager = prompt("You have $" + p1.wallet + " left.\n\nHow much would you like to wager?\n($5 minimum, don't include '$')","0");
	if(isFinite(wager) && wager >= 5 && wager <= p1.wallet)
		isValid = true;
	else
		isValid = false; alert("You chose an invalid amount to wager, you can only wager between $5 and $" + p1.wallet + ".\nAlso, do not include the dollar sign ($).");
	}
	while(isValid = false);
}

// Function for displaying the score. pass 1 for i when dice rolls are known and revealed, and 0 when they are unknown.
function scoreboard(p,c,pot,r,t,i){
	
	var potto = "\nPot: $" + pot + "\n";
	var rollPC;
	var walletPC = "Wallet: $" + p.wallet + "\n";
	var rollCOM;
	var walletCOM = "Wallet: $" + c.wallet + "\n"
	
	switch(i){
        case 2:
            rollPC = "Roll: " + p.tot + " (" + p.d1 + " + " + p.d2 + ")\n";
            rollCOM = "Roll: ??(? + ?)\n";
            break;
        case 1:
			rollPC = "Roll: " + p.tot + " (" + p.d1 + " + " + p.d2 + ")\n";
			rollCOM = "Roll: " + c.tot + " (" + c.d1 + " + " + c.d2 + ")\n";
			break;
		case 0:
            rollPC = rollCOM = "Roll: ??(? + ?)\n";
            break;
        default:
            alert("SCOREBOARD ERROR");
            break;
	}
	
	var score =
        "== CURRENT SCORE | Round " + r + " / Turn + " + t + " ==\n" + 
	"\nYOU\n__________\n" + rollPC + walletPC +
	"\nCOMPUTER\n__________\n" + rollCOM + walletCOM +
	potto;
	
    return score;
}

function getComMove(p,c) { //Some computer AI
    var move; //Computers decision. -1 = fold, 0 = call, 1 = raise.
    var isRisky;

    isRisky = Math.round(Math.random());    //50% chance that the AI is feeling risky this turn.

    if (c.tot >= 11)
        move = 1;
    else if (c.tot <= 5 || (p.wager >= 15 && isRisky == false) || p.wager >= 25)
        move = -1;
    else if (c.tot >= 10 || (p.wager <= 5 && isRisky == true))
        move = 1;
    else
        move = 0;


    return move;


}

function gameLoop(){
	var pc = new Player();
	var com = new Player();
	var pot = 0; //Where the player wagers go
    var r = 0, t; //Round and turn Counter
    var wTemp; //Holding place for wagers before applying to wallet and pot.
    var cTemp; //variable for holding whether or not Player calls COM's raise
    var sTemp; //temp variable for strings
	
    do {
        r++;
        t = 1;
        pc.roll();  //Roll the dice for both players
        com.roll();

        pc.wallet -= 5; //Ante up $5 for both players, bringing pot to $10
        com.wallet -= 5;
        pot += 10;
        alert("You've placed $5 ante in the pot.");

        do {    //Get the Player's wager and validate the data
            wTemp = prompt(scoreboard(pc, com, pot, r, t, 2) + "\n__________\nYou rolled " + pc.tot + " total.\nHow much would you like to wager?\n(Don't include the '$')", "0");
        } while (isNaN(wTemp) || wTemp > pc.wallet || wTemp < 0);

        wTemp = Number(wTemp); //Make sure wTemp is a number...
        pc.wager = wTemp;   //Apply the wager to both pot and wallet.
        pc.wallet -= pc.wager;
        pot += pc.wager;


        // Get the COM's move, then adjust their wager accordingly. PC's wager may change, but is applied to pot immediately
        switch (getComMove(pc, com)) {
            case 1:
                com.wager = pc.wager + 5;
                if (com.wager <= com.wallet) {
                    cTemp = confirm("COM has raised the bet by $5. Press OK to call his raise, or hit CANCEL to fold.");
                    if (cTemp && pc.wallet >= 5) {
                        pc.wallet -= 5;
                        pot += 5;
                    }
                    else if (cTemp) {
                        pot += pc.wallet;
                        pc.wallet = 0;
                        alert("You've gone ALL-IN to match COM's bet!");
                    }
                    break;
                }
                alert("COM looks worriedly at his remaining money...");
            case 0:
                com.wager = pc.wager;
                if (com.wager <= com.wallet)
                    alert("COM has called your bet.");
                else {
                    com.wager = com.wallet;
                    alert("The COM has gone ALL-IN to match your bet!");
                }
                break;
            case -1:
                com.wager = 0;
                com.total = 0; //Set his total to zero so he can't win after folding
                alert("COM has folded without betting.");
                break;
            default:
                alert("MOVE GET ERROR");
                break;
        }

        // Apply Com's wager to the pot and wallet.
        com.wallet -= com.wager;
        pot += com.wager;

        //Determine who won
        switch (pc.fight(com)) {
            case 0:
                sTemp = "It's a complete tie! You both rolled " + pc.tot + "!\nThe wagers will stay in the pot for next turn!";
                break;
            case 1:
                sTemp = "You won! All the money in the pot goes to you!";
                pc.wallet += pot;
                pot = 0;
                break;
            case 2:
                sTemp = "COM won. The pot goes to COM this time."
                com.wallet += pot;
                pot = 0;
                break;
            default:
                alert("FIGHT ERROR");
                break;
        }

        //Display results and who won!
        alert(scoreboard(pc, com, pot, r, t, 1) + "__________\n" + sTemp);

        // Turn 2 Start, if I have time to include it. COM will go first on turn 2 of each Round. Player has option to quit after Rounds, but not turns.
        t++;



    } while (pc.wallet >= 5 && com.wallet >= 5 && confirm("Hit OK to play another round, or hit CANCEL to quit and see the final results!"));

    document.getElementById("pWallet").innerHTML = pc.wallet;
    document.getElementById("cWallet").innerHTML = com.wallet;
}














