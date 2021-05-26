"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class TimeScore {
        constructor() {
            this.timer = new f.Time();
            f.Time.game.setTimer(3000, 1, this.updateScore);
        }
        //updating timer in html
        updateTime() {
            let timeObject = document.getElementById("time");
            let timeInSeconds = Math.floor(this.timer.get() / 1000);
            let seconds = timeInSeconds % 60;
            let minuts = Math.floor(timeInSeconds / 60);
            timeObject.innerHTML = "timer: " + minuts + ":" + seconds;
        }
        // updateing score in html
        updateScore() {
            if (!LX_Final.gameState.includes("over")) {
                //cut off everything except bevor =
                let scoreString = document.getElementById("score").innerHTML;
                let stringParts = scoreString.split(":");
                console.log(stringParts[1]);
                //convert number to type number
                let score = parseInt(stringParts[1]);
                //set new score
                score++;
                document.getElementById("score").innerHTML = "score: " + score.toString();
            }
        }
    }
    LX_Final.TimeScore = TimeScore;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=TimeScore.js.map