"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class MapBorder extends Endabgabe.QuadNode {
        constructor(name, pos, size) {
            super(name, pos, size);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.5, 0.5, 0.5, 1);
            this.setRectPosition();
        }
    }
    Endabgabe.MapBorder = MapBorder;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=MapBorder.js.map