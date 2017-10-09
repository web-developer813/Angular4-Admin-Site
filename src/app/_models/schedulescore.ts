export interface IScheduleScore {
  $key?: number;
  $exists?: any;

  schedule_id: number;
  home_team_score: string;
  away_team_score: string;
}

export class ScheduleScore {
  schedule_id: number;
  home_team_score: string;
  away_team_score: string;

  constructor() {
    this.schedule_id = 0;
    this.home_team_score = '';
    this.away_team_score = '';
  }
}
