"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Enemie extends Endabgabe.QuadNode {
        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            this.speedEnemie = 5;
            this.toggleX = 1;
            this.toggleY = 1;
            //moves the enemie
            this.moveEnemie = () => {
                let offsetEnemie = this.speedEnemie * f.Loop.timeFrameReal / 1000;
                this.mtxLocal.translateX(offsetEnemie * 1.3 * this.toggleX);
                this.mtxLocal.translateY(offsetEnemie * 1.7 * this.toggleY);
                this.setRectPosition();
            };
            //increase enemie speed every 10 sec until max of speed 50
            this.startIncreasingSpeed = () => {
                console.log("Enemie speed: " + this.speedEnemie);
                if (this.speedEnemie <= Endabgabe.externalData.configureEnemie.maxSpeed) {
                    this.speedEnemie += 1.5;
                }
                if (!Endabgabe.gameState.includes("over")) {
                    f.Time.game.setTimer(10000, 1, this.startIncreasingSpeed);
                }
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
        }
        //change direction
        toggleDirection(collisionAt) {
            switch (collisionAt) {
                case "leftBorder":
                    this.toggleX = 1;
                    break;
                case "rightBorder":
                    this.toggleX = -1;
                    break;
                case "topBorder":
                    this.toggleY = -1;
                    break;
                case "downBorder":
                    this.toggleY = 1;
                    break;
            }
        }
    }
    Endabgabe.Enemie = Enemie;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Enemie.js.map