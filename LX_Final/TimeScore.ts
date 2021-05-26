namespace LX_Final {
    import f = FudgeCore;
    export class TimeScore {
        private timer: f.Time;

        constructor() {
            this.timer = new f.Time();
            f.Time.game.setTimer(3000, 1, this.updateScore);
        }

        //updating timer in html
        public updateTime(): void {
            let timeObject: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("time");
            let timeInSeconds: number = Math.floor(this.timer.get() / 1000);
            let seconds: number = timeInSeconds % 60;
            let minuts: number = Math.floor(timeInSeconds / 60);
            timeObject.innerHTML = "timer: " + minuts + ":" + seconds;
        }

        // updateing score in html
        public updateScore(): void {
            if (!gameState.includes("over")) {
                //cut off everything except bevor =
                let scoreString: string = document.getElementById("score").innerHTML;
                let stringParts: string[] = scoreString.split(":");
                console.log(stringParts[1]);
                //convert number to type number
                let score: number = parseInt(stringParts[1]);
                //set new score
                score++;
                document.getElementById("score").innerHTML = "score: " + score.toString();
            }
        }
    }
}