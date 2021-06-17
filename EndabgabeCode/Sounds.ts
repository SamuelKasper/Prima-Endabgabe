namespace Endabgabe {
    import f = FudgeCore;

    export enum SoundList { collectCoin, settingTrap }

    export class Sounds {
        private music: f.Audio;
        private coin: f.Audio;

        private cmpBackgroundMusic: f.ComponentAudio;
        private cmpCoinSound: f.ComponentAudio;


        public constructor() {
            this.music = new f.Audio("Audio/Final.mp3");
            this.cmpBackgroundMusic = new f.ComponentAudio(this.music, true, false);
            this.cmpBackgroundMusic.connect(true);
            this.cmpBackgroundMusic.volume = 0.5;

            this.coin = new f.Audio("Audio/CoinSoundE.mp3");
            this.cmpCoinSound = new f.ComponentAudio(this.coin, false, false);
            this.cmpCoinSound.connect(true);
            this.cmpCoinSound.volume = 0.5;
        }

        public playSound(_sound: SoundList): void {
            if (_sound == SoundList.collectCoin) {
                this.cmpCoinSound.play(true);
            }
        }

        public playBackgroundMusic(_state: boolean): void {
            this.cmpBackgroundMusic.play(_state);
        }

    }

}