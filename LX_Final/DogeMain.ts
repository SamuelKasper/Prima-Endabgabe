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
    //Trap Node
    let trapNode: Trap;
    export let trapActive: boolean = false;
    //Coin Node
    let coinNode: Coins;
    let scoreIncrease: boolean = true;
    //Sound Node
    let sound: Sounds;
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
    //buttons
    let startBtn: HTMLButtonElement;
    let resetBtn: HTMLButtonElement;
    //gamestate
    export let gameState: string;
    //TimeScore
    let timescore: TimeScore; 

    function init(): void {
        //Canvas holen und speichern
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //start button init
        startBtn = <HTMLButtonElement>document.getElementById("startBtn");

        //reset button init
        resetBtn = <HTMLButtonElement>document.getElementById("resetBtn");

        //set gamestate
        setGameState("waiting for start");

        //create and move camera
        let comCamera: f.ComponentCamera = new f.ComponentCamera();
        comCamera.mtxPivot.translateZ(40);
        comCamera.mtxPivot.translateY(0);
        comCamera.mtxPivot.rotateY(180);

        //creating children and adding them to rootNode
        sound = new Sounds();
        characterNode = new Character();
        rootNode.addChild(characterNode);
        enemieNode = new Enemie();
        rootNode.addChild(enemieNode);
        addChildMapBorder();
        rootNode.addChild(mapBorderNode);

        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        
        //add actionlistener on start button 
        startBtn.addEventListener("click", hndStartButton);

        //add actionlistener on reset button 
        resetBtn.addEventListener("click", hndResetButton);
    }

    function hndStartButton(): void {
        sound.playBackgroundMusic(true);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        setGameState("running");
        timescore = new TimeScore();
        startIncreasingSpeed();
        startSettingTraps();
        startPlacingCoins();
        timescore.updateScore();
        startBtn.blur(); //remove focus on button
        startBtn.disabled = true;
    }

    function hndResetButton(): void {
        location.reload();
    }

    function update(_event: Event): void {
        characterNode.moveCharacter();
        checkCollision();
        enemieNode.moveEnemie();
        timescore.updateTime();
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
            setGameState("over");
            f.Loop.stop();
            let gameoverText: HTMLParagraphElement = document.createElement("p");
            gameoverText.innerHTML = "Game Over";
            document.getElementById("gameover").appendChild(gameoverText);
            sound.playBackgroundMusic(false);
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

        /* collision character - coin */
        if (characterNode.checkCollision(coinNode)) {
            sound.playSound(SoundList.collectCoin);
            rootNode.removeChild(coinNode);
            //ScoreIncrease to prevent multiple increases of score at the same coin
            if (scoreIncrease) {
                //cut off everything except bevor =
                let scoreString: string = document.getElementById("score").innerHTML;
                let stringParts: string[] = scoreString.split(":");
                console.log(stringParts[1]);
                //convert number to type number
                let score: number = parseInt(stringParts[1]);
                //set new score
                score += 3;
                document.getElementById("score").innerHTML = "score: " + score.toString();
                scoreIncrease = false;
            }
        }
    }
/*
    //set time in html
    function updateTime(): void {
        let timeObject: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("time");
        let timeInSeconds: number = Math.floor(timer.get() / 1000);
        let seconds: number = timeInSeconds % 60;
        let minuts: number = Math.floor(timeInSeconds / 60);
        timeObject.innerHTML = "timer: " + minuts + ":" + seconds;
    }

    //set score in html
    function updateScore(): void {
        if (!gameState.includes("over")) {
            //cut off everything except bevor =
            let scoreString: string = document.getElementById("score").innerHTML;
            let stringParts: string[] = scoreString.split(":");
            console.log(stringParts[1]);
            //convert number to type number
            let score: number = parseInt(stringParts[1]);
            //set new score
            score++;
            document.getElementById("score").innerHTML = "score: " + score.toString();
            f.Time.game.setTimer(3000, 1, updateScore);
        }
    }
    */

    //increase enemie speed after 10 sec
    function startIncreasingSpeed(): void {
        enemieNode.increaseSpeed();
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(10000, 1, startIncreasingSpeed);
        }
    }

    //setting gameState
    function setGameState(state: string): void {
        gameState = state;
        document.getElementById("state").innerHTML = "Gamestate: " + gameState;
    }

    //setting Traps at the players position
    function startSettingTraps(): void {
        //remove recent trap and disable trapActive
        rootNode.removeChild(trapNode);
        trapActive = false;
        //create trapNode and add to root
        trapNode = new Trap(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
        rootNode.addChild(trapNode);
        //activate trap after 1 second and start timer for the next trap
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(1500, 1, trapNode.activateTrap);
            f.Time.game.setTimer(5000, 1, startSettingTraps);
        }
    }

    //placing coins
    function startPlacingCoins(): void {
        //remove coinNode if existing
        if (coinNode) {
            rootNode.removeChild(coinNode);
        } else {
            console.log("no coinNode found");
        }
        //create new coin at random position
        coinNode = new Coins(getRandomPosition(), getRandomPosition());
        rootNode.addChild(coinNode);

        //repeat if not game over
        if (!gameState.includes("over")) {
            f.Time.game.setTimer(4000, 1, startPlacingCoins);
        }
        scoreIncrease = true;
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
