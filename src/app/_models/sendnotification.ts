export interface ISendNotification {
  $key?: number;
  $exists?: any;

  send_id: number;
  message: string;
}
export class SendNotification {
  send_id: number;
  message: string;

  constructor() {
    this.send_id = 0;
    this.message = '';
  }
}
