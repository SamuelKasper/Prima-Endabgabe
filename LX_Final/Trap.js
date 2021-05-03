"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class Trap extends LX_Final.QuadNode {
        constructor(x, y) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(3, 3));
            this.activateTrap = () => {
                this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0, 0, 1);
                LX_Final.trapActive = true;
            };
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 1, 0, 1);
        }
    }
    LX_Final.Trap = Trap;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Trap.js.map