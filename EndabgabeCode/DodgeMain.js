"use strict";
var Dodge;
(function (Dodge) {
    var f = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new f.Viewport();
    let rootNode = new f.Node("root");
    let characterNode;
    let enemieNode = new f.Node("enemieMainNode");
    let enemieOne;
    let enemieTwo;
    let trapNode;
    let coinNode;
    let scoreIncrease = true;
    let sound;
    let leftMapBoarder;
    let rightMapBoarder;
    let topMapBoarder;
    let downMapBoarder;
    let leftBorderPosition = new f.Vector2(-16, 0);
    let rightBorderPosition = new f.Vector2(16, 0);
    let topBorderPosition = new f.Vector2(0, 16);
    let bottomBorderPosition = new f.Vector2(0, -16);
    let horizontalSize = new f.Vector2(1, 33);
    let verticalSize = new f.Vector2(32, 1);
    let startBtn;
    let resetBtn;
    let timescore;
    Dodge.trapActive = false;
    async function init() {
        //load data from external file
        await loadExternalData("./ExternalData/externalData.json");
        const canvas = document.querySelector("canvas");
        startBtn = document.getElementById("startBtn");
        resetBtn = document.getElementById("resetBtn");
        //set gamestate
        setGameState("waiting for start");
        //create and position camera
        let comCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);
        comCamera.clrBackground = f.Color.CSS("white");
        //load textures
        await Dodge.Character.loadCharacterTexture();
        await Dodge.Enemie.loadEnemieTexture();
        //creating children and adding them to rootNode
        sound = new Dodge.Sounds();
        characterNode = new Dodge.Character();
        enemieOne = new Dodge.Enemie();
        Dodge.mapBorderNode = new f.Node("borderNode");
        addChildMapBorder();
        enemieNode.addChild(enemieOne);
        rootNode.addChild(enemieNode);
        rootNode.addChild(characterNode);
        rootNode.addChild(Dodge.mapBorderNode);
        //initialize viewport
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        //adding listener to buttons
        startBtn.addEventListener("click", hndStartButton);
        resetBtn.addEventListener("click", hndResetButton);
    }
    //function to load external data into externalData object
    async function loadExternalData(_url) {
        let response = await fetch(_url);
        Dodge.externalData = await response.json();
    }
    //when start button is clicked
    function hndStartButton() {
        sound.playBackgroundMusic(true);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        setGameState("running");
        timescore = new Dodge.TimeScore();
        enemieOne.startIncreasingSpeed();
        startSettingTraps();
        startPlacingCoins();
        startBtn.blur(); //remove focus on button
        startBtn.disabled = true;
    }
    //reload if reload button is clicked
    function hndResetButton() {
        location.reload();
    }
    function update(_event) {
        characterNode.moveCharacter();
        checkCollision();
        for (let enemies of enemieNode.getChildren()) {
            enemies.moveEnemie();
        }
        timescore.updateTime();
        createSecondEnemie();
        viewport.draw();
    }
    //setting up map borders and adding them as child
    function addChildMapBorder() {
        leftMapBoarder = new Dodge.MapBorder("leftBorder", leftBorderPosition, horizontalSize);
        rightMapBoarder = new Dodge.MapBorder("rightBorder", rightBorderPosition, horizontalSize);
        topMapBoarder = new Dodge.MapBorder("topBorder", topBorderPosition, verticalSize);
        downMapBoarder = new Dodge.MapBorder("downBorder", bottomBorderPosition, verticalSize);
        Dodge.mapBorderNode.addChild(leftMapBoarder);
        Dodge.mapBorderNode.addChild(rightMapBoarder);
        Dodge.mapBorderNode.addChild(topMapBoarder);
        Dodge.mapBorderNode.addChild(downMapBoarder);
    }
    //checking collision
    function checkCollision() {
        for (let border of Dodge.mapBorderNode.getChildren()) {
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
            for (let enemies of enemieNode.getChildren()) {
                if (border.checkCollision(enemies)) {
                    enemies.toggleDirection(border.name);
                }
            }
        }
        /* collision character - enemie */
        for (let enemies of enemieNode.getChildren()) {
            if (characterNode.checkCollision(enemies)) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
                sound.playBackgroundMusic(false);
            }
        }
        /* collision character - trap */
        if (characterNode.checkCollision(trapNode)) {
            if (Dodge.trapActive) {
                setGameState("over");
                f.Loop.stop();
                let gameoverText = document.createElement("p");
                gameoverText.innerHTML = "Game Over";
                document.getElementById("gameover").appendChild(gameoverText);
                sound.playBackgroundMusic(false);
            }
        }
        /* collision enemie - trap */
        for (let enemies of enemieNode.getChildren()) {
            if (enemies.checkCollision(trapNode)) {
                if (Dodge.trapActive) {
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
            //ScoreIncrease to prevent multiple increases of score at the same coin
            if (scoreIncrease) {
                sound.playSound(Dodge.SoundList.collectCoin);
                //increase Bonus speed
                Dodge.bonusSpeedFromCoins = Dodge.bonusSpeedFromCoins + 0.2;
                characterNode.addBonusSpeed();
                //cut off everything except bevor =
                let scoreString = document.getElementById("score").innerHTML;
                let stringParts = scoreString.split(":");
                //convert number to type number
                let score = parseInt(stringParts[1]);
                //set new score
                score += 3;
                document.getElementById("score").innerHTML = "score: " + score.toString();
                scoreIncrease = false;
            }
        }
    }
    //setting gameState
    function setGameState(state) {
        Dodge.gameState = state;
        document.getElementById("state").innerHTML = "Gamestate: " + Dodge.gameState;
    }
    //setting Traps at the players position
    function startSettingTraps() {
        //remove recent trap and disable trapActive
        rootNode.removeChild(trapNode);
        Dodge.trapActive = false;
        //create trapNode and add to root
        trapNode = new Dodge.Trap(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
        rootNode.addChild(trapNode);
        //activate trap after 1 second and start timer for the next trap
        if (!Dodge.gameState.includes("over")) {
            f.Time.game.setTimer(Dodge.externalData.configureTraps.activationTime, 1, trapNode.activateTrap);
            f.Time.game.setTimer(Dodge.externalData.configureTraps.spawningRate, 1, startSettingTraps);
        }
    }
    //placing coins
    function startPlacingCoins() {
        //remove coinNode if existing
        if (coinNode) {
            rootNode.removeChild(coinNode);
        }
        //create new coin at random position
        coinNode = new Dodge.Coins(getRandomPosition(), getRandomPosition());
        rootNode.addChild(coinNode);
        //repeat if not game over
        if (!Dodge.gameState.includes("over")) {
            f.Time.game.setTimer(Dodge.externalData.configureCoins.spawningRate, 1, startPlacingCoins);
        }
        //enable scoreInrease & speedIncrease after creating new coin
        scoreIncrease = true;
        Dodge.speedIncrease = true;
    }
    function createSecondEnemie() {
        if (Dodge.oneMinutePassed == true) {
            if (!enemieTwo) {
                enemieTwo = new Dodge.Enemie();
                enemieNode.addChild(enemieTwo);
                rootNode.addChild(enemieNode);
                enemieTwo.startIncreasingSpeed();
            }
        }
    }
    //generate random number between -15.5 and 15.5
    function getRandomPosition() {
        let sign = Math.floor(Math.random() * 10);
        let rnd;
        if (sign % 2 == 0) {
            rnd = Math.floor(Math.random() * (15.5));
        }
        else {
            rnd = Math.floor(Math.random() * (-15.5));
        }
        return rnd;
    }
})(Dodge || (Dodge = {}));
//# sourceMappingURL=DodgeMain.js.map