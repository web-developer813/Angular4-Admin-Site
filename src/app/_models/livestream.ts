export interface ILiveStream {
  $key?: number;
  $exists?: any;

  status?: string;
}

export class LiveStream {
  status?: string;

  constructor() {
    this.status = '';
  }
}
