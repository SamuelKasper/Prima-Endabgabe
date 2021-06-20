namespace Dodge {
    import f = FudgeCore;
    export let oneMinutePassed: boolean;
    export class TimeScore {
        private timer: f.Time;
        constructor() {
            this.timer = new f.Time();
            this.updateScore();
        }

        //updating timer in html
        public updateTime(): void {
            let timeObject: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("time");
            let timeInSeconds: number = Math.floor(this.timer.get() / 1000);
            let seconds: number = timeInSeconds % 60;
            let minutes: number = Math.floor(timeInSeconds / 60);
            timeObject.innerHTML = "Time: " + minutes + ":" + seconds;
            if (minutes >= 1) {
                oneMinutePassed = true;
            }
        }

        // updating score in html
        public updateScore = (): void => {
            if (!gameState.includes("over")) {
                //cut off everything except bevor =
                let scoreString: string = document.getElementById("score").innerHTML;
                let stringParts: string[] = scoreString.split(":");
                //convert number to type number
                let score: number = parseInt(stringParts[1]);
                //set new score
                score++;
                document.getElementById("score").innerHTML = "Score: " + score.toString();
                f.Time.game.setTimer(3000, 1, this.updateScore);
            }
        }
    }
}