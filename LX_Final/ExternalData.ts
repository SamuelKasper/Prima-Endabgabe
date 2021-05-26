namespace Endabgabe {
    export interface ConfigureEnemie {
        maxSpeed: number;
    }
    export interface ConfigureAvatar {
        movementSpeed: number;
    }
    export interface ConfigureCoins {
        spawningRate: number;
    }
    export interface ConfigureTraps {
        spawningRate: number;
        activationTime: number;
    }
    export interface ExternalData {
        configureEnemie: ConfigureEnemie;
        configureAvatar: ConfigureAvatar;
        configureCoins: ConfigureCoins;
        configureTraps: ConfigureTraps;
    }
}