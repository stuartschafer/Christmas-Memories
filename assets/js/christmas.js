$(document).ready(function() {
    let colors = ["red", "blue", "white", "yellow", "orange",
        "purple", "aqua", "chartreuse", "mistyrose", "grey",
        "fuchsia", "gold", "pink", "magenta", "navy",
        "salmon", "deeppink", "firebrick", "black", "lightskyblue"];
    let matches = [1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1];
    let firstChoice = true;
    let difficultyChosen = null;
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
    let gameTime = 0;
    let gameOver = false;
    let milisecond = 0;
    let leftSec = 0;
    let rightSec = 0;
    let minute = 0;
    let gameStarted = false;
    let correct = 0;
    let alreadySolved = "no";
    let treeMoveTime = 0;
    let addToTreeTime = 0;
    let snowballTime = 0;
    let addToSnowballTime = 0;
    let rotate = "";
    let possibleChoice = "";
    let possibleChoiceId = "";
    let possibleChoices = 0;
    let matchingId = 0;
    let possibleArray = [];
    let inArray = 0;
    let randomNumber = 0;
    let checkifMatched = "";
    let clickedonSnowglobe = false;
    let startingSnowglobes = 5;
    let snowball = false;
    let cardPack = "christmas";
    let cardPackExt = ".jpg";


    $("#playAgain").hide();
    // Testing for the snowball position
    // $("#snowball6").addClass("snowglobeIntroFromLeft");
    

    shuffleColorsAndImages();
    makeSnowglobes();

    // $('#myModal').modal("toggle");

    $("#showTimer").on("click", function(event) {
        $("#timeStuff").fadeIn("slow");
    });

    $("#hideTimer").on("click", function(event) {
        $("#timeStuff").fadeOut("slow");
    });

    // This is for the cardPack selection
    $(".cardPack").on("click", function(event) {
        $(".cardPack").css("visibility", "hidden");
        cardPack = $(this).attr("id");
        cardPackExt = $(this).attr("cardPackExt");
    });

    // This is for the difficulty selection
    $(".difficulty").on("click", function(event) {
        difficultyChosen = true;
        $("#chooseDiff").css("visibility", "hidden");
        let difficulty = $(this).attr("id");
        switch (true) {
            // No tree movement & No snowballs
            case difficulty === "level1":
                treeMoveTime = 9999999999;
                snowballTime = 9999999999;
                break;
            // No tree movement, BUT snowballs
            case difficulty === "level2":
                treeMoveTime = 9999999999;
                snowballTime = 700;
                addToSnowballTime = 700;
                break;
            // No tree movement, BUT snowballs happen more often
            case difficulty === "level3":
                treeMoveTime = 9999999999;
                snowballTime = 700;
                addToSnowballTime = 350;
                break;
            // Tree movement & snowballs
            case difficulty === "level4":
                treeMoveTime = 1500;
                addToTreeTime = 1500;
                snowballTime = 700;
                addToSnowballTime = 700;
                break;
            // Tree movement BUT snowballs AND tree movement happen more often
            case difficulty === "level5":
                treeMoveTime = 1500;
                addToTreeTime = 750;
                snowballTime = 700;
                addToSnowballTime = 350;
                break;
        }
    });

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
        // This checks to see if the game has begun. If it hasn't, then the game timer starts
        if (gameStarted === false && difficultyChosen === true) {
            playerTime();
            gameStarted = true;
        }
        // This makes sure the user hasn't selected 1 image already and that the game is not over
        if (firstChoice === true && gameOver === false && difficultyChosen === true) {
            nextTurn = false;
            if (starIsRecharged === true) {
                for (let i=0; i<21; i++) {
                    $("#" + i).attr("src", "assets/images/" + cardPack + matches[i-1] + cardPackExt);
                }
                $("#star").css("opacity", "0.2");
                $("#star").css("transform", "scale(0.01)");
                
                $("#star").addClass("smallStar");
                $("#star").attr("src", "assets/images/stopped_star.gif");
                $("#star").fadeTo(7000, 1.0);
                starTime = 3000;
                starClicked = "yes";
                starTimer();
            }
        }
    });

    // This is when the player selects a snowglobe (possible selections will be narrowed for the player)
    $(".snowglobes").on("click", function(event) {
        if (clickedonSnowglobe === false && firstChoice === false) {
            clickedonSnowglobe = true;
            let whichGlobe = $(this).attr("id");
            // $("#" + whichGlobe).fadeOut("slow");
            $("#" + whichGlobe).addClass("shakeGlobe");
            $("#" + whichGlobe).delay(200).fadeOut(3000);
            // if (startingSnowglobes === 5) {
            //     $("#snowglobeSection").css("margin-left", "30.5%");
            // } else if (startingSnowglobes === 4) {
            //     $("#snowglobeSection").css("margin-left", "36.5%");
            // } else if (startingSnowglobes === 3) {
            //     $("#snowglobeSection").css("margin-left", "41.5%");
            // } else if (startingSnowglobes === 2) {
            //     $("#snowglobeSection").css("margin-left", "45.5%");
            // }
            
            startingSnowglobes--;
            givethePlayerChoices();
        }
    });

    function givethePlayerChoices() {
        if (firstChoice === false && correct < 9) {
            let matchNum = $("#" + firstPicId).attr("match");

            for (let i=1; i<21; i++) {
                let checkForMatchNum = $("#" + i).attr("match");
                let checkifSamePic = $("#" + i).attr("id");
                
                if (checkForMatchNum === matchNum) {
                    matchingId = $("#" + i).attr("id");
                    $("#" + i).addClass("possibility");
                    if (checkifSamePic != firstPicId) {
                        $("#" + i).attr("src", "assets/images/questionmark.gif");
                    }
                    
                    possibleArray.push(matchingId);
                }
            }
            addOtherPossibleChoices();
        }

        function addOtherPossibleChoices() {
            randomNumber = Math.floor((Math.random() * 20) + 1);
            inArray = possibleArray.indexOf(randomNumber.toString());
            checkifMatched = $("#" + randomNumber).attr("solved");

            if (inArray > -1 || checkifMatched === "yes") {
                addOtherPossibleChoices();
            } else {
                $("#" + randomNumber).addClass("possibility");
                $("#" + randomNumber).attr("src", "assets/images/questionmark.gif");

                possibleArray.push(randomNumber.toString());
                possibleChoices++;
            }

            // 5 selections
            if (possibleChoices < 4 && correct <= 2) {
                addOtherPossibleChoices();
            // 4 selections
            } else if (possibleChoices < 3 && correct >= 3 && correct <=5) {
                addOtherPossibleChoices();
            // 3 selections
            } else if (possibleChoices < 2 && correct >= 6 && correct <=7) {
                addOtherPossibleChoices();
            // 2 selections
            } else if (possibleChoices < 1 && correct === 8) {
                addOtherPossibleChoices();
            }
        }
        possibleArray = [];
        possibleChoices = 0;
    }
    

    // This is for the ornaments that are clickable
    $(".clickable").on("click", function(event) {
        // console.log(difficultyChosen);
        if (difficultyChosen === true) {
            alreadySolved = $(this).attr("solved");

            // This checks to see if the game has begun. If it hasn't, then the game timer starts
            if (gameStarted === false) {
                playerTime();
                gameStarted = true;
            }

            // nextTurn is so the player cannot click on the star and an ornament at the same time
            // alreadySolved means the user has already solved that image
            if (nextTurn === true && alreadySolved === "no") {
                if (firstChoice === true) {
                    firstChoice = false;
                    firstPic = $(this).attr("match");
                    firstPicId = $(this).attr("id");
                    $("#" + firstPicId).attr("src", "assets/images/" + cardPack + firstPic + cardPackExt);
                    $("#" + firstPicId).addClass("largerImg");

                } else {
                    secondPic = $(this).attr("match");
                    secondPicId = $(this).attr("id");
                    $("#" + secondPicId).attr("src", "assets/images/" + cardPack + secondPic + cardPackExt);
                    $("#" + secondPicId).addClass("largerImg");
                    
                    // This checks to see if the 2 pictures match each other
                    if (firstPic === secondPic) {
                        madeMatch = true;
                        nextTurn = false;
                        correct++;
                        time = 200;
                        pauseTime();
                    } else {
                        nextTurn = false;
                        time = 200;
                        pauseTime();
                    }
                    
                    if (correct === 10) {
                        endGame();
                    }
                }
            }
        }
    });





    // THis is for the stopwatch timer in the upper right corner
    function playerTime() {
        intervalId3 = setInterval(gameStart, 10);
    }

    function gameStart() {
        if (gameOver === true) {
            clearInterval(intervalId3);
        }
        if (milisecond === 100) {
            rightSec++;
            milisecond = 0;
        }
        if (rightSec === 10) {
            leftSec++;
            rightSec = 0;
        }
        if (leftSec === 6) {
            minute++;
            leftSec = 0;
        }
        if (milisecond < 10) {
            $("#msecs").html("0" + milisecond);
        } else {
            $("#msecs").html(milisecond);
        }

        
        $("#sec1").html(leftSec);
        $("#sec2").html(rightSec);
        $("#minute").html(minute);
        milisecond++;
        gameTime++;
        
        // This part works on the snowglobes functionality
        if (gameTime > snowballTime && gameTime < (snowballTime+2)) {
            
            let random1 = Math.floor((Math.random() * 100) + 1);
            // console.log(random1);
            if (snowball === false) {
                $(".snowballs").removeClass("snowglobeIntroFromLeft snowglobeIntroFromRight snowglobeIntroFromTop meltAway");
                switch (true) {
                    case random1 >= 99:
                        $("#snowball1").addClass("snowglobeIntroFromTop");
                        snowball = true;
                    break;
                    case random1 >= 98:
                        $("#snowball2").addClass("snowglobeIntroFromRight");
                        snowball = true;
                    break;
                    case random1 >= 4:
                        $("#snowball3").addClass("snowglobeIntroFromLeft");
                        snowball = true;
                    break;
                    case random1 >= 3:
                        $("#snowball4").addClass("snowglobeIntroFromRight");
                        snowball = true;
                    break;
                    case random1 >= 2:
                        $("#snowball5").addClass("snowglobeIntroFromTop");
                        snowball = true;
                    break;
                    case random1 >= 1:
                        $("#snowball6").addClass("snowglobeIntroFromLeft");
                        snowball = true;
                    break;
                }
            } else {
                // $(".snowballs").removeClass("snowglobeIntro");
                $(".snowballs").addClass("meltAway");
                
                snowball = false;
                
            }
            snowballTime = snowballTime + addToSnowballTime;
               
            
        }
        
        // This part will determine if the tree moves from side to side
        if (gameTime > treeMoveTime && gameTime < (treeMoveTime+2)) {
            let random2 = Math.floor((Math.random() * 100) + 1);
            // console.log("tree rotate = " + random2);
            if (random2 > 60 && random2 < 100) {
                if (rotate === "neg45") {
                    $(".gameboard").addClass("neg45ToBase");
                    $(".gameboard").removeClass("rotateNeg45");
                    rotate = "";
                } else if (rotate === "pos45") {
                    
                    $(".gameboard").addClass("pos45ToBase");
                    $(".gameboard").removeClass("rotatePos45");
                    rotate = "";
                } else {
                    if (random2 > 60 && random2 <= 80) {
                        $(".gameboard").removeClass("pos45ToBase");
                        $(".gameboard").addClass("rotateNeg45");
                        $(".gameboard").removeClass("neg45ToBase");
                        rotate = "neg45";
                    } else if (random2 > 80 && random2 <= 100) {
                        $(".gameboard").removeClass("neg45ToBase");
                        $(".gameboard").addClass("rotatePos45");
                        $(".gameboard").removeClass("pos45ToBase");
                        rotate = "pos45";
                    }
                }           
            }
            treeMoveTime = treeMoveTime + addToTreeTime;
        }

    }









    // This is the after 2 ornaments are clicked timer
    function pauseTime() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        console.log(time);
        // console.log(`nextTurn = ${nextTurn}, starClicked = ${starClicked}, starIsRecharged = ${starIsRecharged}`);
        // When 2 ornaments are clicked and they DO NOT match
        if (time === 0 && nextTurn === false && madeMatch === false) {
            clearInterval(intervalId);
            $("#" + firstPicId).attr("src", "assets/images/trans.png");
            $("#" + secondPicId).attr("src", "assets/images/trans.png");
            $("#" + firstPicId).css("background-color", colors[firstPicId-1]);
            $("#" + secondPicId).css("background-color", colors[secondPicId-1]);
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            for (let i=1; i<21; i++) {
                let solvedImg = $("#" + i).attr("solved");
                $("#" + i).removeClass("possibility");
                if (i != firstPicId && solvedImg === "no") {
                    $("#" + i).attr("src", "assets/images/trans.png");
                }  
            }
            clickedonSnowglobe = false;
            nextTurn = true;
            firstChoice = true;
        } else if (time === 0 && madeMatch === true) {
            clearInterval(intervalId);
            $("#" + firstPicId).attr("solved", "yes");
            $("#" + secondPicId).attr("solved", "yes");
            $("#" + firstPicId).addClass("solved");
            $("#" + secondPicId).addClass("solved");
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            for (let i=1; i<21; i++) {
                let solvedImg = $("#" + i).attr("solved");
                $("#" + i).removeClass("possibility");
                if (i != firstPicId && solvedImg === "no") {
                    $("#" + i).attr("src", "assets/images/trans.png");
                } 
                if (i.toString() === secondPicId) {
                    let firstSrc = $("#" + firstPicId).attr("src");
                    $("#" + i).attr("src", firstSrc);
                }
            }
            clickedonSnowglobe = false;
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
        if (starTime === 2800) {
            for (let i=0; i<21; i++) {
                $("#" + i).attr("src", "assets/images/trans.png");
                $("#" + i).css("background-color", colors[i-1]);
                $("#" + i).removeClass("largerImg");
            }
            nextTurn = true;
        } else if (starTime === 0) {
            $('#myModal').modal("toggle");
            $("#star").attr("src", "assets/images/star.gif");
            starIsRecharged = true;
            starClicked = "no";
            $("#star").removeClass("smallStar");
            $("#star").css("transform", "scale(1.0)");
            clearInterval(intervalId2);
        }
        starTime--;
    }





    function endGame() {
        clearInterval(intervalId3);
        $(".snowglobes").fadeIn("slow");
        console.log("YOU WIN!");
        console.log(gameTime);
        $("#titleTop").html("YOU WIN!");
        $("#playAgain").fadeIn("slow");
        $(".gameboard").removeClass("rotateNeg45");
        $(".gameboard").removeClass("neg45ToBase");
        $(".gameboard").removeClass("rotatePos45");
        $(".gameboard").removeClass("pos45ToBase");
    }

    $("#playAgain").on("click", function(event) {
        // This resets everything to the beginning
        $("#playAgain").fadeOut("slow");
        $(".cardPack").css("visibility", "visible");
        $("#chooseDiff").css("visibility", "visible");
        $("#titleTop").html("Merry Christmas");
        $("#minute").html("0");
        $("#sec1").html("0");
        $("#sec2").html("0");
        $("#msecs").html("00");
        $(".snowglobes").removeClass("shakeGlobe");
        for (let i=1; i<21; i++) {
            $("#" + i).attr("solved", "no");
            $("#" + i).attr("src", "assets/images/trans.png");
            $("#" + i).css("background-color", colors[i-1]);
            $("#" + i).removeClass("solved");
        }

        firstChoice = true;
        i = 0;
        j = 0;
        temp = null;
        temp2 = null;
        firstPic = "";
        sencondPic = "";
        firstPicId = "";
        secondPicId = "";
        nextTurn = true;
        bgcolor1 = "";
        bgcolor2 = "";
        starIsRecharged = true;
        starClicked = "no";
        time = 0;
        time2 = 0;
        starTime = 0;
        madeMatch = false;
        gameTime = 0;
        gameOver = false;
        milisecond = 0;
        leftSec = 0;
        rightSec = 0;
        minute = 0;
        gameStarted = false;
        correct = 0;
        alreadySolved = null;
        treeMoveTime = 0;
        addToTreeTime = 0;
        snowballTime = 0;
        addToSnowballTime = 0
        possibleChoice = "";
        possibleChoices = 0;
        matchingId = 0;
        possibleArray = [];
        clickedonSnowglobe = false;
        startingSnowglobes = 5;
        snowball = false;
        cardPack = "christmas";
        cardPackExt = ".jpg";

        $(".snowballs").removeClass("snowglobeIntroFromLeft snowglobeIntroFromRight snowglobeIntroFromTop meltAway");

        shuffleColorsAndImages();
    });





    function shuffleColorsAndImages() {
     
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

    function makeSnowglobes() {
        for (let i=1; i<startingSnowglobes+1; i++) {
            $("#snowglobeSection").append('<img class="snowglobes" id="snowglobe' + i + '" used="no" src="assets/images/snowglobe.png">');
        }
    }
});