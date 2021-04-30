"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class Enemie extends LX_Final.QuadNode {
        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            this.speedEnemie = 5;
            this.toggleX = 1;
            this.toggleY = 1;
            this.moveEnemie = () => {
                let offsetEnemie = this.speedEnemie * f.Loop.timeFrameReal / 1000;
                this.mtxLocal.translateX(offsetEnemie * this.toggleX);
                this.mtxLocal.translateY(offsetEnemie * 1.5 * this.toggleY);
                this.setRectPosition();
            };
            this.increaseSpeed = () => {
                console.log("Enemie speed: " + this.speedEnemie);
                this.speedEnemie += 1.5;
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 1, 0, 1);
        }
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
    LX_Final.Enemie = Enemie;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Enemie.js.map