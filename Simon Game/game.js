var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var game_start = false;
var level = 0


$(".btn").click(function(){
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(checkAnswer(userClickedPattern.length-1)){

    if(userClickedPattern.length===level){
        setTimeout(() => {
            userClickedPattern = [];
            nextSequence();
        }, 1000);
    }
    }
    else{
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
   // nextSequence();
    //console.log(userClickedPattern);
});

$(document).keypress(function(){
    if(!game_start){
        $("#level-title").text("Level 0");
        nextSequence();
        game_start = true;
    }
});
function nextSequence() {
level++;
$("#level-title").text("Level "+level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

  
}

function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    //$("#" + currentColor).addClass(".pressed");
    //setInterval(function(){$("#" + currentColor).toggleClass('pressed')}, 100);
    var header = $('#' + currentColor);
    header.addClass('pressed');
    setTimeout(function() {
    header.removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       return true;
    }
    else{
       return false;
    }

} 
function startOver(){

    level = 0;
    gamePattern = [];
    game_start = false;
    userClickedPattern = [];
}
