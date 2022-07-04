# Eclipse Techboard

It's here: [Manfranmike.github.io](https://manfranmike.github.io/)

This is a digital techboard I made over two weekends to use while playing Eclipse 1E. I've included some optional 2E settings, in case you're playing 2E or 1.5E. I can't promise it'll work with 2E exactly, as I use 1E.

I can't promise there will be any more updates to this tool as it currently works well enough for my needs. My group needed a way to see the techs and pass it around without throwing tiles around. I load this up on a small tablet, and it works perfectly. Any other device (even fullscreen on PC) won't be as responsive and may look funky.

If you find any issues or have suggestions, feel free to add them to this repo or even fork it to make some changes yourself.

## How to use

1. Go to [Manfranmike.github.io](https://manfranmike.github.io/)
1. Select options you need and hit "Start Round 1"
2. If Predictable Technologies was selected, you need to press the Next Round button at the bottom to draw the first tiles.
3. Tap/Click on a technology with a quantity over zero to purchase it
4. Tap/Click the ">>" Next Round button to draw new tiles based on player count.
5. Refreshing the page will delete all data and start the techboard over.

## Settings Details
- **Use 2E Tech Costs**: Uses the tech cost balancing from 2E (i.e, swapping Plasma Missles and Gluon Computer costs)
- **Use Predictable Technologies**: This will use the variant for predicting technologies. Techs that will be drawn the next time you hit ">>" will have a yellow hourglass on them.
- **Rise of the Ancients Techs**: Adds the tech from the first 1E expansion to the draw bag.
- **Shadow of the Rift Techs**: Adds the tech from the second 1E expansion to the draw bag.
- **Tractor Beam**:  Adds the Tractor Beam tech from the Ship Pack One 1E expansion to the draw bag.
- **Improved Logistics & Pico Modulator**: Adds two new techs from base 2E to the draw bag.
- **Warp Portal & Ancient Labs**: Adds two new techs from base 2E that used to be developments in 1E.
- **No Rift Cannon**: Prevents Rift Cannon from being drawn despite other settings.

## Features
- All 1E base and expansion techs
- 4 techs added in 2E
- Player count selection
- Toggleable expansions
- Toggleable Predictable Technologies variant
- Toggleable 2E base costs
- Purchase techs to reduce count
- Weighted randoms for drawing tiles based on quantity included in 1E

## To-Do
None of these are guaranteed to happen, but if I come back to the project, then these are getting developed first:

- Undo feature for misclicked purchases
- Show description of tech before purchase
- Better responsiveness on more screen sizes
- Better looking confirm toasts
- Remove W3.CSS crutch
