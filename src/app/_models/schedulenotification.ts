export interface IScheduleNotification {
  $key?: number;
  $exists?: any;

  schedule_id: number;
  message: string;
  datetime: number;
}
export class ScheduleNotification {
  schedule_id: number;
  message: string;
  datetime: number;

  constructor() {
    this.schedule_id = 0;
    this.message = '';
    this.datetime = 0;
  }
}
