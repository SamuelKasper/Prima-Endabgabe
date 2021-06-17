"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    class TimeScore {
        constructor() {
            // updateing score in html
            this.updateScore = () => {
                if (!Dodge.gameState.includes("over")) {
                    //cut off everything except bevor =
                    let scoreString = document.getElementById("score").innerHTML;
                    let stringParts = scoreString.split(":");
                    //convert number to type number
                    let score = parseInt(stringParts[1]);
                    console.log(score);
                    //set new score
                    score++;
                    document.getElementById("score").innerHTML = "score: " + score.toString();
                    f.Time.game.setTimer(3000, 1, this.updateScore);
                }
            };
            this.timer = new f.Time();
            this.updateScore();
        }
        //updating timer in html
        updateTime() {
            let timeObject = document.getElementById("time");
            let timeInSeconds = Math.floor(this.timer.get() / 1000);
            let seconds = timeInSeconds % 60;
            let minutes = Math.floor(timeInSeconds / 60);
            timeObject.innerHTML = "timer: " + minutes + ":" + seconds;
            if (minutes >= 1) {
                Dodge.oneMinutePassed = true;
            }
        }
    }
    Dodge.TimeScore = TimeScore;
})(Dodge || (Dodge = {}));
//# sourceMappingURL=TimeScore.js.map