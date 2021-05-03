"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class MapBorder extends LX_Final.QuadNode {
        constructor(name, pos, size) {
            super(name, pos, size);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.5, 0.5, 0.5, 1);
            this.setRectPosition();
        }
    }
    LX_Final.MapBorder = MapBorder;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=MapBorder.js.map