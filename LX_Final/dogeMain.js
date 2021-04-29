"use strict";
var LX_Final;
(function (LX_Final) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new f.Viewport();
    //Root Node
    let rootNode = new f.Node("root");
    //Character Node
    let characterNode;
    //Enemie Node
    let enemieNode;
    //mapBorder
    let mapBorderNode = new f.Node("borderNode");
    let leftMapBoarder;
    let rightMapBoarder;
    let topMapBoarder;
    let downMapBoarder;
    let leftBorderPosition = new f.Vector2(-16, 0);
    let rightBorderPosition = new f.Vector2(16, 0);
    let topBorderPosition = new f.Vector2(0, 16);
    let downBorderPosition = new f.Vector2(0, -16);
    let horizontalSize = new f.Vector2(1, 33);
    let verticalSize = new f.Vector2(32, 1);
    function init(_event) {
        //Canvas holen und speichern
        const canvas = document.querySelector("canvas");
        //Camera erstellen und verschieben
        let comCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);
        //creating children and adding them to rootNode
        characterNode = new LX_Final.Character();
        rootNode.addChild(characterNode);
        enemieNode = new LX_Final.Enemie();
        rootNode.addChild(enemieNode);
        addChildMapBorder();
        rootNode.addChild(mapBorderNode);
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        document.getElementById("state").innerHTML = "Gamestate: running";
    }
    function update(_event) {
        characterNode.moveCharacter();
        checkCollision();
        enemieNode.moveEnemie();
        viewport.draw();
    }
    //setting up map borders and adding them as child
    function addChildMapBorder() {
        leftMapBoarder = new LX_Final.MapBorder("leftBorder", leftBorderPosition, horizontalSize);
        rightMapBoarder = new LX_Final.MapBorder("rightBorder", rightBorderPosition, horizontalSize);
        topMapBoarder = new LX_Final.MapBorder("topBorder", topBorderPosition, verticalSize);
        downMapBoarder = new LX_Final.MapBorder("downBorder", downBorderPosition, verticalSize);
        mapBorderNode.addChild(leftMapBoarder);
        mapBorderNode.addChild(rightMapBoarder);
        mapBorderNode.addChild(topMapBoarder);
        mapBorderNode.addChild(downMapBoarder);
    }
    //checking collision
    function checkCollision() {
        for (let border of mapBorderNode.getChildren()) {
            /* collision character - border */
            if (border.checkCollision(characterNode)) {
                //if collision
                characterNode.disableMove(border.name);
            }
            else {
                //if no collision
                characterNode.enableMove(border.name);
            }
            /* collision enemie - border */
            if (border.checkCollision(enemieNode)) {
                enemieNode.toggleDirection(border.name);
            }
        }
        /* collision character - enemie */
        if (characterNode.checkCollision(enemieNode)) {
            document.getElementById("state").innerHTML = "Gamestate: Over";
            f.Loop.stop();
        }
    }
})(LX_Final || (LX_Final = {}));
//# sourceMappingURL=DogeMain.js.map