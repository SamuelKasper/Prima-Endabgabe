namespace LX_Final {
    import f = FudgeCore;

    window.addEventListener("load", init);
    let viewport: f.Viewport = new f.Viewport();

    //Root Node
    let rootNode: f.Node = new f.Node("root");
    //Character Node
    let characterNode: Character;
    //mapBorder
    let mapBorderNode: f.Node = new f.Node("borderNode");
    let leftMapBoarder: MapBorder;
    let rightMapBoarder: MapBorder;
    let topMapBoarder: MapBorder;
    let downMapBoarder: MapBorder;
    let leftBorderPosition: f.Vector2 = new f.Vector2(-16, 0);
    let rightBorderPosition: f.Vector2 = new f.Vector2(16, 0);
    let topBorderPosition: f.Vector2 = new f.Vector2(0, 16);
    let downBorderPosition: f.Vector2 = new f.Vector2(0, -16);
    let horizontalSize: f.Vector2 = new f.Vector2(1, 33);
    let verticalSize: f.Vector2 = new f.Vector2(32, 1);

    function init(_event: Event): void {
        //Canvas holen und speichern
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //Camera erstellen und verschieben
        let comCamera: f.ComponentCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);

        //Nodes an rootNode hängen
        characterNode = new Character();
        rootNode.addChild(characterNode);
        addChildMapBorder();
        rootNode.addChild(mapBorderNode);

        //viewport initialisieren
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();

        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);

    }

    function update(_event: Event): void {
        characterNode.moveCharacter();
        checkCollision();
        viewport.draw();
    }

    function addChildMapBorder(): void {
        leftMapBoarder = new MapBorder("leftBorder", leftBorderPosition, horizontalSize);
        rightMapBoarder = new MapBorder("rightBorder", rightBorderPosition, horizontalSize);
        topMapBoarder = new MapBorder("topBorder", topBorderPosition, verticalSize);
        downMapBoarder = new MapBorder("downBorder", downBorderPosition, verticalSize);
        mapBorderNode.addChild(leftMapBoarder);
        mapBorderNode.addChild(rightMapBoarder);
        mapBorderNode.addChild(topMapBoarder);
        mapBorderNode.addChild(downMapBoarder);
    }

    function checkCollision(): void {
        //console.log("CHECKING");
        for (let border of mapBorderNode.getChildren() as MapBorder[]) {
            if (border.checkCollision(characterNode)) {
                //console.log(border.name + "collision detected");
                //if collisions
                switch (border.name) {
                    case "leftMapBorder":
                        characterNode.disableMove("left");
                        break;
                    case "rightMapBorder":
                        characterNode.disableMove("right");
                        break;
                    case "topMapBorder":
                        characterNode.disableMove("top");
                        break;
                    case "downMapBorder":
                        characterNode.disableMove("down");
                        break;
                }
            } else {
                //if no collisions
                characterNode.enableMove();
                //console.log("no collision");
            }
        }
    }
}
