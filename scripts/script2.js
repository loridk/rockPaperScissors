/**
 * Created by Lori DK on 10/27/2015.
 * Version 1.3
 */

/* TO DO
-keep score
-reset score
*/

$(document).ready(function() {

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
            var message = compare(choice, computerChoice, name);

            // output winner
            $("#message").html(message);

            // ask to play again
            $("#playAgain").show();

        }while(computerChoice == choice);

    });

    // Reset game
    $( "#again" ).on( "click", function( event ) {
        console.log("again");
        hideAll();
        $("#newName").show();
    });

    // chose name change
    $( "#yes" ).on( "click", function( event ) {
        console.log("new name");
        hideAll();
        $("#nameForm").show();
        $("#banner").show();
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

// find winner
function compare(choice1, choice2, name) {

    if (choice1 === "Rock") {
        if (choice2 === "Scissors") {
            return "<b>Rock beats scissors! <span class='winner'>" +name+ " wins!</span></b>";
        }

        else {
            return "<b>Paper beats rock! <span class='loser'>" +name+ " loses!</span></b>";
        }
    }

    else if (choice1 === "Paper") {
        if (choice2 === "Rock") {
            return "<b>Paper beats rock! <span class='winner'>" +name+ " wins!</span></b>";
        }

        else {
            return "<b>Scissors beat paper! <span class='loser'>" +name+ " loses!</span></b>";
        }
    }

    else if (choice1 === "Scissors") {
        if (choice2 === "Rock") {
            return "<b>Rock beats scissors! <span class='loser'>" +name+ " loses!</span></b>";
        }

        else {
            return "<b>Scissors beats paper! <span class='winner'>" +name+ " wins!</span></b>";
        }
    }
}
