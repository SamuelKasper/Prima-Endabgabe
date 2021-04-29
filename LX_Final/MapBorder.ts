namespace LX_Final {
    import f = FudgeCore;
    export class MapBorder extends QuadNode {
        constructor(name: string, pos: f.Vector2, size: f.Vector2) {
            super(name, pos, size);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
        }
    }
}