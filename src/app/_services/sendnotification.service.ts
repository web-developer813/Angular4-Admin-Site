import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { SendNotification } from '../_models';
@Injectable()
export class SendNotificationService {
  constructor(private apiService: ApiService) {}

  addSendNotification(sendNotificationData: SendNotification): Observable<any> {
    return this.apiService.post(`/sendNotification`, sendNotificationData).map(response => {
      return response;
    });
  }
}
