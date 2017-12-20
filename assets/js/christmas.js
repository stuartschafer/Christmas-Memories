$(document).ready(function() {
    let colors = ["red", "blue", "white", "yellow", "orange",
        "purple", "aqua", "chartreuse", "cyan", "grey",
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

    shuffleColors();


    $(".ornamentRow").on("click", function(event) {
        // let ornNumber = $(this).attr("match");

        if (firstChoice === true) {
            firstPic = $(this).attr("match");
            firstPicId = $(this).attr("id");
            $("#" + firstPicId).attr("src", "assets/images/1.jpg");
            firstChoice = false;
        } else {
            secondPic = $(this).attr("match");

            if (firstPic === secondPic) {
                
            } else {
                $("#" + firstPicId).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==");
                
            }
            firstChoice = true;
        }
    });



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