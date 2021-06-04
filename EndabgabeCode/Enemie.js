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
            this.texture = new f.TextureImage("./Images/Enemie.png");
            this.material = new f.Material("enemieMat", f.ShaderTexture, new f.CoatTextured(null, this.texture));
            this.textureNode = new Endabgabe.QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(3, 3));
            //moves the enemie
            this.moveEnemie = () => {
                //rotate texture
                this.textureNode.mtxLocal.rotateZ(7 + 0.25 * this.speedEnemie);
                let offsetEnemie = this.speedEnemie * f.Loop.timeFrameReal / 1000;
                this.mtxLocal.translateX(offsetEnemie * 1.3 * this.toggleX);
                this.mtxLocal.translateY(offsetEnemie * 1.7 * this.toggleY);
                this.setRectPosition();
            };
            //increase enemie speed every 10 sec until max of speed 50
            this.startIncreasingSpeed = () => {
                console.log("Enemie speed: " + this.speedEnemie);
                console.log("Enemie rotation: " + (7 + 0.25 * this.speedEnemie));
                if (this.speedEnemie < Endabgabe.externalData.configureEnemie.maxSpeed) {
                    this.speedEnemie += 1;
                }
                if (!Endabgabe.gameState.includes("over")) {
                    f.Time.game.setTimer(10000, 1, this.startIncreasingSpeed);
                }
            };
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
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
        hitsTrap(_enemieX, _enemieY, _trapX, _trapY) {
            let difX = _enemieX - _trapX;
            let difXAbs = Math.abs(difX);
            let difY = _enemieY - _trapY;
            let difYAbs = Math.abs(difY);
            if (difXAbs > difYAbs) {
                if (difX > 0) {
                    this.toggleDirection("topBorder");
                }
                else {
                    this.toggleDirection("downBorder");
                }
            }
            else {
                if (difY > 0) {
                    this.toggleDirection("rightBorder");
                }
                else {
                    this.toggleDirection("leftBorder");
                }
            }
        }
    }
    Endabgabe.Enemie = Enemie;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Enemie.js.map