/**
 * Created by Lori DK on 10/27/2015.
 * Version 1.4
 */

/* TO DO
-ask name less
-reset score
*/

$(document).ready(function() {

    var game = 0;

    // hide everything but name form to start
    hideAll();
    $("#nameForm").show();
    $("#banner").show();



    // play or chose no name change
    $( "#play, #no" ).on( "click", function( event ) {
        console.log("start");

        var name = getName();

        // hide name form, show choice screen
        hideAll();
        $("#nameOutput").text(name);
        $("#nameOutput").show();
        $("#choose").show();
        $("#images").show();

    });

    //chose image
    $( "a" ).on( "click", function( event ) {
        event.preventDefault();
        hideAll();
        $("#results").show();

        var choice = $(this).attr("id");
        console.log(choice);
        var img = chooseImg(choice);
        $("#img").html(img);
        $("#choice").text(choice);

        // covert comp's choice
        do{
            var name = getName();

            var computerChoice = randomChoice();
            console.log(computerChoice);

            var imgComp = chooseImg(computerChoice);
            $("#imgComp").html(imgComp);
            $("#choiceComp").text(computerChoice);

            // find winner
            var getWin = compare(choice, computerChoice);
        }while(computerChoice == choice);

        if (window.localStorage) {
            console.log('Local Storage is available');
            $("#score").show();

            if (!localStorage.scoreTotal && !localStorage.scoreTotalComp) {
                localStorage.scoreTotal = 0;
                localStorage.scoreTotalComp = 0;
            }

            if (getWin == 1 || getWin == 3 || getWin == 6) {
                var outcome = "<span class='winner'>" +name+ " wins!</span></b>";
                localStorage.scoreTotal++;
                if (getWin == 1){
                    var message = "<b>Rock beats scissors!</b> " + outcome;
                }
                else if(getWin == 3) {
                    var message = "<b>Paper beats rock!</b> " + outcome;
                }
                else {
                    var message = "<b>Scissors beats paper!</b> " + outcome;
                }
            }
            else {
                var outcome = "<span class='loser'>" +name+ " loses!</span></b>";
                localStorage.scoreTotalComp++;
                if (getWin == 2){
                    var message = "<b>Paper beats rock!</b> " + outcome;
                }
                else if(getWin == 4) {
                    var message = "<b>Scissors beat paper!</b> " + outcome;
                }
                else {
                    var message = "<b><b>Rock beats scissors!</b> " + outcome;
                }
            }
            $("#scoreTotal").html("<b>You: " + localStorage.scoreTotal +"</b>");
            $("#scoreTotalComp").html("<b>Computer: " + localStorage.scoreTotalComp + "</b>");
        }

        else {

            if (getWin == 1 || getWin == 3 || getWin == 6) {
                var outcome = "<span class='winner'>" +name+ " wins!</span></b>";
                if (getWin == 1){
                    var message = "<b>Rock beats scissors!</b> " + outcome;
                }
                else if(getWin == 3) {
                    var message = "<b>Paper beats rock!</b> " + outcome;
                }
                else {
                    var message = "<b>Scissors beats paper!</b> " + outcome;
                }
            }
            else {
                var outcome = "<span class='loser'>" +name+ " loses!</span></b>";
                if (getWin == 2){
                    var message = "<b>Paper beats rock!</b> " + outcome;
                }
                else if(getWin == 4) {
                    var message = "<b>Scissors beat paper!</b> " + outcome;
                }
                else {
                    var message = "<b><b>Rock beats scissors!</b> " + outcome;
                }
            }
        }

        // output winner
        $("#message").html(message);

        // ask to play again
        $("#playAgain").show();

    });

    // Reset game
    $( "#again" ).on( "click", function( event ) {
        game++;
        console.log(game);
        console.log("again");

        hideAll();
        $("#newName").show();

        if (game % 5 == 0){
            $("#newName").show();
        }

        else {
            var name = getName();

            // hide name form, show choice screen
            hideAll();
            $("#nameOutput").text(name);
            $("#nameOutput").show();
            $("#choose").show();
            $("#images").show();
        }

    });

    // chose name change
    $( "#yes" ).on( "click", function( event ) {
        console.log("new name");
        hideAll();
        $("#nameForm").show();
        $("#banner").show();
    });

    $( "#clearScore" ).on( "click", function( event ) {
        localStorage.scoreTotal = 0;
        localStorage.scoreTotalComp = 0;
        $("#scoreTotal").html("<b>You: " + localStorage.scoreTotal +"</b>");
        $("#scoreTotalComp").html("<b>Computer: " + localStorage.scoreTotalComp + "</b>");
    });

});

// hide all divs
function hideAll() {
    $("#nameOutput").hide();
    $("#choose").hide();
    $("#images").hide();
    $("#results").hide();
    $("#playAgain").hide();
    $("#newName").hide();
    $("#banner").hide();
    $("#nameForm").hide();
    $("#score").hide();
};

// set name
function getName() {
    var name = $('input#name').val();

    // if name is blank, it defaults to Violet
    if(name == "" || !name || name == " ") {
        return "Violet";
    }
    else {
        return name;
    }
}

// chose for computer
function randomChoice(){
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
        computerChoice = "Rock";
    }
    else if(computerChoice <= 0.67) {
        computerChoice = "Paper";
    }
    else {
        computerChoice = "Scissors";
    }
    return computerChoice;
}

// get image of choice
function chooseImg(pick){
    if(pick == "Rock") {
        return '<img src="images/rock.png" />';
    }
    else if(pick == "Paper") {
        return '<img src="images/paper.png" />';
    }
    else {
        return '<img src="images/scissors.png" />';
    }
}

function compare(choice1, choice2) {

    if (choice1 === "Rock") {
        if (choice2 === "Scissors") {
            return 1;
        }

        else {
            return 2;
        }
    }

    else if (choice1 === "Paper") {
        if (choice2 === "Rock") {
            return 3;
        }

        else {
            return 4;
        }
    }

    else if (choice1 === "Scissors") {
        if (choice2 === "Rock") {
            return 5;
        }

        else {
            return 6;
        }
    }
}

/*
// find winner
function compare(choice1, choice2, name) {

    if (choice1 === "Rock") {
        if (choice2 === "Scissors") {
            return "<b>Rock beats scissors! <span class='winner'>" +name+ " wins!</span></b>"; //1
        }

        else {
            return "<b>Paper beats rock! <span class='loser'>" +name+ " loses!</span></b>"; //2
        }
    }

    else if (choice1 === "Paper") {
        if (choice2 === "Rock") {
            return "<b>Paper beats rock! <span class='winner'>" +name+ " wins!</span></b>"; //3
        }

        else {
            return "<b>Scissors beat paper! <span class='loser'>" +name+ " loses!</span></b>"; //4
        }
    }

    else if (choice1 === "Scissors") {
        if (choice2 === "Rock") {
            return "<b>Rock beats scissors! <span class='loser'>" +name+ " loses!</span></b>"; //5
        }

        else {
            return "<b>Scissors beats paper! <span class='winner'>" +name+ " wins!</span></b>"; //6
        }
    }
}
*/