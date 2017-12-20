$(document).ready(function() {
    let colors = ["red", "blue", "white", "yellow", "orange",
        "purple", "aqua", "chartreuse", "cyan", "grey",
        "fuchsia", "gold", "pink", "magenta", "navy",
        "salmon", "deeppink", "firebrick", "black", "lightskyblue"];
    let matches = [1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1];
    let firstChoice = true;
    let secondChoice = true;
    let i = 0;
    let j = 0;
    let temp = null;
    let temp2 = null;
    let firstPic = "";
    let sencondPic = "";
    let firstPicId = "";
    let secondPicId = "";
    let nextTurn = true;
    let bgcolor1 = "";
    let bgcolor2 = "";
    let starRecharge = true;
    let starClicked = "no";

    shuffleColors();

    // $('#myModal').modal("toggle");

    $("#modalBtn").on("click", function(event) {
        $('#myModal').modal("toggle");
        intervalId = setInterval(shortTimer, 10);
        let timeLeft = 100;
        function shortTimer() {
        if (timeLeft === 0) {
            clearInterval(intervalId);
            $("#modalSection").remove();
        }
        timeLeft--;
    }
        
    });

    // This displays all pictures for 1.5 seconds
    // It occurs every 30 seconds
    $("#star").on("click", function(event) {
        if (firstChoice === true && secondChoice === true) {
            nextTurn = false;
            if (starRecharge === true) {
                for (let i=0; i<21; i++) {
                    $("#" + i).attr("src", "assets/images/" + matches[i-1] + ".jpg");
                }
                starClicked = "yes";
                time = 200;
                pauseTime();
            }
        }
    });

    // This is for the ornaments that are clickable
    $(".clickable").on("click", function(event) {
        if (nextTurn === true) {
            if (firstChoice === true) {
                firstPic = $(this).attr("match");
                firstPicId = $(this).attr("id");
                $("#" + firstPicId).attr("src", "assets/images/" + firstPic + ".jpg");
                $("#" + firstPicId).addClass("largerImg");
                firstChoice = false;

            } else {
                secondPic = $(this).attr("match");
                secondPicId = $(this).attr("id");
                $("#" + secondPicId).attr("src", "assets/images/" + secondPic + ".jpg");
                $("#" + secondPicId).addClass("largerImg");
                if (firstPic === secondPic) {
                    $("#" + firstPicId).off("click");
                    $("#" + secondPicId).off("click");
                    $("#" + firstPicId).removeClass("largerImg");
                    $("#" + secondPicId).removeClass("largerImg");
                    $("#" + firstPicId).css("opacity", "0.5");
                    $("#" + secondPicId).css("opacity", "0.5");
                    nextTurn = true;
                } else {
                    nextTurn = false;
                    time = 200;
                    pauseTime();
                }
                firstChoice = true;
            }
        }

        
    });

    // This is the timer
    function pauseTime() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        if (time === 0 && starClicked === "yes") {
            for (let i=0; i<21; i++) {
                $("#" + i).attr("src", "assets/images/trans.png");
                $("#" + i).css("background-color", colors[i-1]);
                $("#" + i).removeClass("largerImg");
            }
            starClicked = "no";
            nextTurn = true;
            clearInterval(intervalId);
        } else if (time === 0) {
            console.log("22222");
            $("#" + firstPicId).attr("src", "assets/images/trans.png");
            $("#" + secondPicId).attr("src", "assets/images/trans.png");
            $("#" + firstPicId).css("background-color", colors[firstPicId-1]);
            $("#" + secondPicId).css("background-color", colors[secondPicId-1]);
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            clearInterval(intervalId);
            nextTurn = true;   
        }
        time--;
    }
    

    function shuffleColors() {
     
        // This shuffles the colors & matches array
        for (i = colors.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = colors[i];
            temp2 = matches[i];
            colors[i] = colors[j];
            // matches[i] = matches[j];
            colors[j] = temp;
            // matches[j] = temp2;
        }

        // This assigns each color on the board
        for (var i=1; i<colors.length+1; i++) {
            $("#" + i).css("background-color", colors[i-1]);
            $("#" + i).attr("match", matches[i-1]);
        }
        
    }
});