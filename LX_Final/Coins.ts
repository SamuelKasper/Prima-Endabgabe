namespace LX_Final {
    import f = FudgeCore;
    export class Coins extends QuadNode {

        constructor(x: number, y: number) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(1, 1));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 1, 0, 1);
        }
    }
}