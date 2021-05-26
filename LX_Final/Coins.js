"use strict";
var Endabgabe;
(function (Endabgabe) {
    var f = FudgeCore;
    class Coins extends Endabgabe.QuadNode {
        constructor(x, y) {
            super("enemie", new f.Vector2(x, y), new f.Vector2(1, 1));
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0, 1, 0, 1);
        }
    }
    Endabgabe.Coins = Coins;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Coins.js.map