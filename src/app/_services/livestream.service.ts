import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import { LiveStream } from '../_models';

@Injectable()
export class LiveStreamService {
  constructor(private apiService: ApiService) {}

  getLiveStream(): Observable<LiveStream[]> {
    return this.apiService.get('/settings/stream').map(response => {
      return response;
    });
  }
  updateLiveStream(liveStreamData: LiveStream): Observable<any> {
    return this.apiService.post('/settings/updatestream', liveStreamData).map(response => {
      console.log(response);
      return response;
    });
  }
}
