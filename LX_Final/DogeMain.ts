namespace LX_Final {
    import f = FudgeCore;

    window.addEventListener("load", init);
    let viewport: f.Viewport = new f.Viewport();

    //Root Node
    let rootNode: f.Node = new f.Node("root");
    //Character Node
    let characterNode: Character;
    //Enemie Node
    let enemieNode: Enemie;
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

        //creating children and adding them to rootNode
        characterNode = new Character();
        rootNode.addChild(characterNode);
        enemieNode = new Enemie();
        rootNode.addChild(enemieNode);
        addChildMapBorder();
        rootNode.addChild(mapBorderNode);

        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();

        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        document.getElementById("state").innerHTML = "Gamestate: running";

    }

    function update(_event: Event): void {
        characterNode.moveCharacter();
        checkCollision();
        enemieNode.moveEnemie();
        viewport.draw();
    }

    //setting up map borders and adding them as child
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

    //checking collision
    function checkCollision(): void {
        for (let border of mapBorderNode.getChildren() as MapBorder[]) {

            /* collision character - border */
            if (border.checkCollision(characterNode)) {
                //if collision
                characterNode.disableMove(border.name);
            } else {
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
}