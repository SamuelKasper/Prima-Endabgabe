namespace LX_Final {
    import f = FudgeCore;
    export class Trap extends QuadNode {

        constructor(x: number, y: number) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(2, 2));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 1, 0, 1);
        }

        public activateTrap = (): void => {
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
            trapActive = true;
        }

    }
}