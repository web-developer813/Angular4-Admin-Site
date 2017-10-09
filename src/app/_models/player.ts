export interface IPlayer {
    $key?: number;
    $exists?: any;

    player_id: number;
    player_number: number;
    player_name: string;
    player_position: string;
    player_height: string;
    player_weight: number;
    player_age: number;
    player_exp: string;
    player_college: string;
}

export class Player {
    player_id: number;
    player_number: number;
    player_name: string;
    player_position: string;
    player_height: string;
    player_weight: number;
    player_age: number;
    player_exp: string;
    player_college: string;

    constructor() {
        this.player_id = 0;
        this.player_number = 0;
        this.player_name = '';
        this.player_position = '';
        this.player_height = '';
        this.player_weight = 0;
        this.player_age = 0;
        this.player_exp = '';
        this.player_college = '';
    }
}
