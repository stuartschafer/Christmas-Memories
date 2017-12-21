$(document).ready(function() {
    let colors = ["red", "blue", "white", "yellow", "orange",
        "purple", "aqua", "chartreuse", "mistyrose", "grey",
        "fuchsia", "gold", "pink", "magenta", "navy",
        "salmon", "deeppink", "firebrick", "black", "lightskyblue"];
    let matches = [1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1];
    let firstChoice = true;
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
    let starIsRecharged = true;
    let starClicked = "no";
    let time = 0;
    let time2 = 0;
    let starTime = 0;
    let madeMatch = false;

    shuffleColors();

    // $('#myModal').modal("toggle");

    $("#modalBtn").on("click", function(event) {
        $('#myModal').modal("toggle");
        intervalId1 = setInterval(shortTimer, 10);
        let timeLeft = 100;
        function shortTimer() {
        if (timeLeft === 0) {
            clearInterval(intervalId1);
            $("#modalSection").remove();
        }
        timeLeft--;
    }
        
    });

    // This displays all pictures for 1.5 seconds
    // It occurs every 30 seconds
    $("#star").on("click", function(event) {
        if (firstChoice === true) {
            nextTurn = false;
            if (starIsRecharged === true) {
                for (let i=0; i<21; i++) {
                    $("#" + i).attr("src", "assets/images/" + matches[i-1] + ".jpg");
                    $("#" + i).css("transition", "filter .2s");
                    $("#" + i).css("transition", "all ease-in-out .2s");
                    
                }
                $("#star").css("opacity", "0.2");
                $("#star").css("transform", "scale(0.01)");
                
                $("#star").addClass("smallStar");
                $("#star").attr("src", "assets/images/stopped_star.gif");
                $("#star").fadeTo(7000, 1.0);
                starTime = 900;
                starClicked = "yes";
                starTimer();
            }
        }
    });

    // This is for the ornaments that are clickable
    $(".clickable").on("click", function(event) {
        
        if (nextTurn === true) {
            if (firstChoice === true) {
                firstChoice = false;
                firstPic = $(this).attr("match");
                firstPicId = $(this).attr("id");
                $("#" + firstPicId).attr("src", "assets/images/" + firstPic + ".jpg");
                $("#" + firstPicId).addClass("largerImg");

            } else {
                secondPic = $(this).attr("match");
                secondPicId = $(this).attr("id");
                $("#" + secondPicId).attr("src", "assets/images/" + secondPic + ".jpg");
                $("#" + secondPicId).addClass("largerImg");
                
                // This checks to see if the 2 pictures match each other
                if (firstPic === secondPic) {
                    madeMatch = true;
                    time = 100;
                    pauseTime();
                } else {
                    nextTurn = false;
                    time = 200;
                    pauseTime();
                }
                
            }
        }

        
    });

    // This is the after 2 ornaments are clicked timer
    function pauseTime() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        // console.log(`nextTurn = ${nextTurn}, starClicked = ${starClicked}, starIsRecharged = ${starIsRecharged}`);
        // When 2 ornaments are clicked and they DO NOT match
        if (time === 0 && nextTurn === false && madeMatch === false) {
            $("#" + firstPicId).attr("src", "assets/images/trans.png");
            $("#" + secondPicId).attr("src", "assets/images/trans.png");
            $("#" + firstPicId).css("background-color", colors[firstPicId-1]);
            $("#" + secondPicId).css("background-color", colors[secondPicId-1]);
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            nextTurn = true;
            firstChoice = true;
            clearInterval(intervalId);
        } else if (time === 0 && madeMatch === true) {
            $("#" + firstPicId).off("click");
            $("#" + secondPicId).off("click");
            $("#" + firstPicId).addClass("solved");
            $("#" + secondPicId).addClass("solved");
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            $("#" + firstPicId).removeAttr("id");
            $("#" + secondPicId).removeAttr("id");
            firstChoice = true;
            nextTurn = true;
            madeMatch = false;
        }
        time--;
    }
    






    // This is the timer when the STAR is clicked
    function starTimer() {
        intervalId2 = setInterval(starCount, 10);
    }

    function starCount () {
       
        // This turns back all images to colored circles after 2 seconds (time = 900 when run)
        if (starTime === 750) {
            for (let i=0; i<21; i++) {
                $("#" + i).attr("src", "assets/images/trans.png");
                $("#" + i).css("background-color", colors[i-1]);
                $("#" + i).removeClass("largerImg");
            }
            nextTurn = true;
        } else if (starTime === 0) {
            console.log("STAR IS RECHARGED");
            $('#myModal').modal("toggle");
            $("#star").attr("src", "assets/images/star.gif");
            starIsRecharged = true;
            starClicked = "no";
            $("#star").removeClass("smallStar");
            $("#star").css("transform", "scale(1.0)");
            clearInterval(intervalId2);
            console.log(`nextTurn = ${nextTurn}, starClicked = ${starClicked}, starIsRecharged = ${starIsRecharged}`);
        }
        starTime--;
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
        for (let i=1; i<colors.length+1; i++) {
            $("#" + i).css("background-color", colors[i-1]);
            $("#" + i).attr("match", matches[i-1]);
        }
        
    }
});