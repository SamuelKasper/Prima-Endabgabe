namespace LX_Final {
    import f = FudgeCore;
    export class Enemie extends QuadNode {
        private speedEnemie: number = 5; //5
        private toggleX: number = 1;
        private toggleY: number = 1;

        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
        }

        //moves the enemie
        public moveEnemie = (): void => {
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

        //increase the speed the enemie is moving with. max = 50
        public increaseSpeed = (): void => {
            console.log("Enemie speed: " + this.speedEnemie);
            if (this.speedEnemie <= 50) {
                this.speedEnemie += 1.5;
            }
        }
    }
}