# Twilight Struggle Card Counter
A player aid to count cards in the board game Twilight Struggle.

There is a live version up at https://david.mcwebsite.net/ts/

# how to use

The area is organized into three sections.
1. Two player hands
1. cards in the deck broken up into sections
1. and cards removed or discarded.

Click a card's name to add it to your hand.  Click the arrow between hands to add cards to your opponent's hand if you suspect he has them.

Click the left icon of each card to remove it from game.  Click the down arrow to discard it.

When the the reshuffle happens, click add discards.  Note any cards left "in the deck" (the portion below hands but above discards and removes) will assumed to be in your opponent's hand.

"Region" view allows you to see all cards that are still in the deck that which could directly affect that region.  That can be useful if you are trying to decide whether to headline a scoring card.

"Categories" view allows you to see various categories of cards.  "Suicide" cards do not include summit or olympics because their defcon properties are so rarely relevant.

"Defcon improve" indicates cards that are used to improve the defcon to ditch a bad card.

"Bad card discard" are cards that you can use to get rid of bad cards, even scoring cards.

"HL defcon degrade" indicates cards that are commonly used by the US to deny a coup in the headline.  This one could probably use some work.

# Notes
All cards are ranked against each other.  They are ranked according to how important they are at the times they are usually around.  For example, blockade is highly ranked because it is super important in the early war, even though it is not strong in the mid / late war because it rarely makes it there.  These rankings are purely subjective and up for review.

The app tries to be smart about regions and category lists, but there are limits.  For example muslim revolution only affects middle east if camp david is not removed.  Star wars could be a suicide card if any US suicide cards are in the discard.  Some cards are not included like norad (norad and quagmire could both be removed, but whether norad is in effect depends on what order they were removed).

Sometimes it is convenient to filter by some criteria.  "All" will show all cards, and you will need to be in that mode to select from the full set of cards.  "Most important 15" selects the 15 most important cards (based on my opinion) which are not in the discard or removed.

# Issues
If you find any bugs or have any suggestions, file an issue here on github and I'll take a look.
