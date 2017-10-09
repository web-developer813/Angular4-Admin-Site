export interface ISchedule {
    $key?: number;
    $exists?: any;

    schedule_id: number;
    home_team: string;
    away_team: string;
    schedule_time: string;
    timezone: string;
}

export class Schedule {
    schedule_id: number;
    home_team: string;
    away_team: string;
    schedule_time: string;
    timezone: string;

    constructor() {
        this.schedule_id = 0;
        this.home_team = '';
        this.away_team = '';
        this.schedule_time = '';
        this.timezone = '';
    }
}
