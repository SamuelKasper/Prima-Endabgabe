namespace LX_Final {
    import f = FudgeCore;
    export class Enemie extends QuadNode {
        private speedEnemie: number = 5;
        private toggleX: number = 1;
        private toggleY: number = 1;

        constructor() {
            super("enemie", new f.Vector2(0, 4), new f.Vector2(3, 3));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 1, 0, 1);
        }

        public moveEnemie = (): void => {
            let offsetEnemie: number = this.speedEnemie * f.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateX(offsetEnemie * this.toggleX);
            this.mtxLocal.translateY(offsetEnemie * 1.5 * this.toggleY);
            this.setRectPosition();
        }

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

        public increaseSpeed(): void {
            this.speedEnemie += 2;
        }
    }
}