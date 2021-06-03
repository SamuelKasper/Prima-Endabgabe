"use strict";
var Endabgabe;
(function (Endabgabe) {
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
            if (!Endabgabe.gameState.includes("over")) {
                //cut off everything except bevor =
                let scoreString = document.getElementById("score").innerHTML;
                let stringParts = scoreString.split(":");
                //convert number to type number
                let score = parseInt(stringParts[1]);
                //set new score
                score++;
                document.getElementById("score").innerHTML = "score: " + score.toString();
            }
        }
    }
    Endabgabe.TimeScore = TimeScore;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=TimeScore.js.map