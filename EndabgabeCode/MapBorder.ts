namespace Dodge {
    import f = FudgeCore;
    export class MapBorder extends QuadNode {
        constructor(_name: string, _pos: f.Vector2, _size: f.Vector2) {
            super(_name, _pos, _size);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 0, 0, 1);
            this.setRectPosition();
        }
    }
}