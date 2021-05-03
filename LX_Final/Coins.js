"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    class Coins extends LX_Final.QuadNode {
        constructor(x, y) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(1, 1));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 1, 0, 1);
        }
    }
    LX_Final.Coins = Coins;
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=Coins.js.map