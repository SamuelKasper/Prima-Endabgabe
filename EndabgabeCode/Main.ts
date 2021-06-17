namespace Dodge {
    import f = FudgeCore;

    window.addEventListener("load", init);
    let viewport: f.Viewport = new f.Viewport();
    let rootNode: f.Node = new f.Node("root");
    let characterNode: Character;
    let enemieNode: f.Node = new f.Node("enemieMainNode");
    let enemieOne: Enemie;
    let enemieTwo: Enemie;
    let trapNode: Trap;
    let coinNode: Coins;
    let scoreIncrease: boolean = true;
    let sound: Sounds;
    let leftMapBoarder: MapBorder;
    let rightMapBoarder: MapBorder;
    let topMapBoarder: MapBorder;
    let downMapBoarder: MapBorder;
    let leftBorderPosition: f.Vector2 = new f.Vector2(-16, 0);
    let rightBorderPosition: f.Vector2 = new f.Vector2(16, 0);
    let topBorderPosition: f.Vector2 = new f.Vector2(0, 16);
    let bottomBorderPosition: f.Vector2 = new f.Vector2(0, -16);
    let horizontalSize: f.Vector2 = new f.Vector2(1, 33);
    let verticalSize: f.Vector2 = new f.Vector2(32, 1);
    let startBtn: HTMLButtonElement;
    let resetBtn: HTMLButtonElement;
    let timescore: TimeScore;
    export let mapBorderNode: f.Node;
    export let trapActive: boolean = false;
    export let gameState: string;
    export let externalData: ExternalData;

    async function init(): Promise<void> {
        //load data from external file
        await loadExternalData("./ExternalData/externalData.json");

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        startBtn = <HTMLButtonElement>document.getElementById("startBtn");
        resetBtn = <HTMLButtonElement>document.getElementById("resetBtn");

        //set gamestate
        setGameState("Waiting for start");

        //create and position camera
        let comCamera: f.ComponentCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);
        comCamera.clrBackground = f.Color.CSS("white");

        //load textures
        await Character.loadCharacterTexture();
        await Enemie.loadEnemieTexture();

        //creating children and adding them to rootNode
        sound = new Sounds();
        characterNode = new Character();
        enemieOne = new Enemie();
        mapBorderNode = new f.Node("borderNode");
        addChildMapBorder();
        enemieNode.addChild(enemieOne);
        rootNode.addChild(enemieNode);
        rootNode.addChild(characterNode);
        rootNode.addChild(mapBorderNode);

        //initialize viewport
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();

        //adding listener to buttons
        startBtn.addEventListener("click", hndStartButton);
        resetBtn.addEventListener("click", hndResetButton);
    }

    //load external data into externalData object
    async function loadExternalData(_url: string): Promise<void> {
        let response: Response = await fetch(_url);
        externalData = await response.json();
    }

    //start if button is clicked
    function hndStartButton(): void {
        sound.playBackgroundMusic(true);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        setGameState("running");
        timescore = new TimeScore();
        enemieOne.startIncreasingSpeed();
        startSettingTraps();
        startPlacingCoins();
        //remove focus on button
        startBtn.blur(); 
        startBtn.disabled = true;
    }

    //reload if button is clicked
    function hndResetButton(): void {
        location.reload();
    }

    function update(_event: Event): void {
        characterNode.moveCharacter();
        checkCollision();
        for (let enemies of enemieNode.getChildren() as Enemie[]) {
            enemies.moveEnemie();
        }
        timescore.updateTime();
        createSecondEnemie();
        viewport.draw();
    }

    //setting up map borders and adding them as child
    function addChildMapBorder(): void {
        leftMapBoarder = new MapBorder("leftBorder", leftBorderPosition, horizontalSize);
        rightMapBoarder = new MapBorder("rightBorder", rightBorderPosition, horizontalSize);
        topMapBoarder = new MapBorder("topBorder", topBorderPosition, verticalSize);
        downMapBoarder = new MapBorder("downBorder", bottomBorderPosition, verticalSize);
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
            for (let enemies of enemieNode.getChildren() as Enemie[]) {
                if (border.checkCollision(enemies)) {
                    enemies.toggleDirection(border.name);
                }
            }
        }

        /* collision character - enemie */
        for (let enemies of enemieNode.getChildren() as Enemie[]) {
            if (characterNode.checkCollision(enemies)) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText: HTMLParagraphElement = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
                sound.playBackgroundMusic(false);
            }
        }

        /* collision character - trap */
        if (characterNode.checkCollision(trapNode)) {
            if (trapActive) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText: HTMLParagraphElement = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
                sound.playBackgroundMusic(false);
            }
        }

        /* collision enemie - trap */
        for (let enemies of enemieNode.getChildren() as Enemie[]) {
            if (enemies.checkCollision(trapNode)) {
                if (trapActive) {
                    enemies.hitsTrap(enemies.mtxLocal.translation.x, enemies.mtxLocal.translation.y, trapNode.mtxLocal.translation.x, trapNode.mtxLocal.translation.y);
                }
            }
        }

        /* collision enemieOne - enemieTwo */
        if (enemieTwo) {
            if (enemieTwo.checkCollision(enemieOne)) {
                enemieTwo.hitsTrap(enemieTwo.mtxLocal.translation.x, enemieTwo.mtxLocal.translation.y, enemieOne.mtxLocal.translation.x, enemieOne.mtxLocal.translation.y);
                enemieOne.hitsTrap(enemieOne.mtxLocal.translation.x, enemieOne.mtxLocal.translation.y, enemieTwo.mtxLocal.translation.x, enemieTwo.mtxLocal.translation.y);
            }
        }

        /* collision character - coin */
        if (characterNode.checkCollision(coinNode)) {
            rootNode.removeChild(coinNode);
            //scoreIncrease to prevent multiple increases of score at the same coin
            if (scoreIncrease) {
                sound.playSound(SoundList.collectCoin);
                //increase Bonus speed
                bonusSpeedFromCoins = bonusSpeedFromCoins + 0.2;
                characterNode.addBonusSpeed();

                //cut off everything except bevor =
                let scoreString: string = document.getElementById("score").innerHTML;
                let stringParts: string[] = scoreString.split(":");
                //convert number to type number
                let score: number = parseInt(stringParts[1]);
                //set new score
                score += 3;
                document.getElementById("score").innerHTML = "score: " + score.toString();
                scoreIncrease = false;
            }
        }
    }

    //setting gameState
    function setGameState(state: string): void {
        gameState = state;
        document.getElementById("state").innerHTML = "Gamestate: " + gameState;
    }

    //setting traps at the players position
    function startSettingTraps(): void {
        //remove recent trap and disable trapActive
        rootNode.removeChild(trapNode);
        trapActive = false;
        //create trapNode and add to root
        trapNode = new Trap(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
        rootNode.addChild(trapNode);
        //activate trap after 1 second and start timer for the next trap
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(externalData.configureTraps.activationTime, 1, trapNode.activateTrap);
            f.Time.game.setTimer(externalData.configureTraps.spawningRate, 1, startSettingTraps);
        }
    }

    //placing coins
    function startPlacingCoins(): void {
        //remove coinNode if existing
        if (coinNode) {
            rootNode.removeChild(coinNode);
        }
        //create new coin at random position
        coinNode = new Coins(getRandomPosition(), getRandomPosition());
        rootNode.addChild(coinNode);

        //repeat if not game over
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(externalData.configureCoins.spawningRate, 1, startPlacingCoins);
        }
        //enable scoreInrease & speedIncrease after creating new coin
        scoreIncrease = true;
        speedIncrease = true;
    }

    //create a second enemy
    function createSecondEnemie(): void {
        if (oneMinutePassed == true) {
            if (!enemieTwo) {
                enemieTwo = new Enemie();
                enemieNode.addChild(enemieTwo);
                rootNode.addChild(enemieNode);
                enemieTwo.startIncreasingSpeed();
            }
        }
    }

    //generate random number between -15.5 and 15.5
    function getRandomPosition(): number {
        let sign: number = Math.floor(Math.random() * 10);
        let rnd: number;
        if (sign % 2 == 0) {
            rnd = Math.floor(Math.random() * (15.5));
        } else {
            rnd = Math.floor(Math.random() * (-15.5));
        }
        return rnd;
    }
}
