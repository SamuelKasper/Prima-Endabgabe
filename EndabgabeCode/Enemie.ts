namespace Dodge {
    import f = FudgeCore;
    export class Enemie extends QuadNode {
        //static variable to load texture
        public static texture: f.TextureImage = new f.TextureImage();

        //variables
        private speedEnemie: number = 5;
        private toggleX: number = 1;
        private toggleY: number = 1;
        private material: f.Material = new f.Material("enemieMat", f.ShaderTexture, new f.CoatTextured(null, Enemie.texture));
        private textureNode: QuadNode = new QuadNode("textureNode", new f.Vector2(0, 0), new f.Vector2(3, 3));

        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            //remove material given from quadnote
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            //add new image material
            this.textureNode.getComponent(f.ComponentMaterial).material = this.material;
            this.addChild(this.textureNode);
        }

        //load texture
        public static async loadEnemieTexture(): Promise<void> {
            await Enemie.texture.load("./Images/Enemie.png");
        }

        //moves the enemie
        public moveEnemie = (): void => {
            //rotate texture
            this.textureNode.mtxLocal.rotateZ(7 + 0.25 * this.speedEnemie);

            let offsetEnemie: number = this.speedEnemie * f.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateX(offsetEnemie * 1.3 * this.toggleX);
            this.mtxLocal.translateY(offsetEnemie * 1.7 * this.toggleY);
            this.setRectPosition();
        }

        //change direction
        public toggleDirection(collisionAt: string): void {
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
            if (this.speedEnemie < externalData.configureEnemie.maxSpeed) {
                this.speedEnemie += 1;
            }
            if (!gameState.includes("over")) {
                f.Time.game.setTimer(10000, 1, this.startIncreasingSpeed);
            }
        }
    }
}