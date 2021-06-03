namespace Endabgabe {
    import f = FudgeCore;
    export let toggleX: number = 1;
    export let toggleY: number = 1;
    export class Enemie extends QuadNode {
        private speedEnemie: number = 5;

        private texture: f.TextureImage = new f.TextureImage("./Images/Enemie.png");
        private material: f.Material = new f.Material("enemieMat", f.ShaderTexture, new f.CoatTextured(null, this.texture));
        private textureNode: QuadNode = new QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(3, 3));

        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }

        //moves the enemie
        public moveEnemie = (): void => {
            //rotate texture
            this.textureNode.mtxLocal.rotateZ(7 + 0.25 * this.speedEnemie);
            
            let offsetEnemie: number = this.speedEnemie * f.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateX(offsetEnemie * 1.3 * toggleX);
            this.mtxLocal.translateY(offsetEnemie * 1.7 * toggleY);
            this.setRectPosition();
        }

        //change direction
        public toggleDirection(collisionAt: string): void {
            switch (collisionAt) {
                case "leftBorder":
                    toggleX = 1;
                    break;
                case "rightBorder":
                    toggleX = -1;
                    break;
                case "topBorder":
                    toggleY = -1;
                    break;
                case "downBorder":
                    toggleY = 1;
                    break;
            }
        }

        public hitsTrap(_enemieX: number, _enemieY: number, _trapX: number, _trapY: number): void {
            let difX: number = _enemieX - _trapX;
            let difXAbs: number = Math.abs(difX);
            let difY: number = _enemieY - _trapY;
            let difYAbs: number = Math.abs(difY);
            if (difXAbs > difYAbs) {
                if (difX > 0) {
                    this.toggleDirection("topBorder");
                } else {
                    this.toggleDirection("downBorder");
                }
            } else {
                if (difY > 0) {
                    this.toggleDirection("rightBorder");
                } else {
                    this.toggleDirection("leftBorder");
                }
            }
        }

        //increase enemie speed every 10 sec until max of speed 50
        public startIncreasingSpeed = (): void => {
            console.log("Enemie speed: " + this.speedEnemie);
            console.log("Enemie rotation: " + (7 + 0.25 * this.speedEnemie));
            if (this.speedEnemie <= externalData.configureEnemie.maxSpeed) {
                this.speedEnemie += 1.5;
            }
            if (!gameState.includes("over")) {
                f.Time.game.setTimer(10000, 1, this.startIncreasingSpeed);
            }
        }
    }
}