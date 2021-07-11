"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    class MapBorder extends Dodge.QuadNode {
        constructor(_name, _pos, _size) {
            super(_name, _pos, _size);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 0, 0, 1);
            this.setRectPosition();
        }
    }
    Dodge.MapBorder = MapBorder;
})(Dodge || (Dodge = {}));
//# sourceMappingURL=MapBorder.js.map