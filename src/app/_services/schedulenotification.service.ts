import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { ScheduleNotification } from '../_models';

@Injectable()
export class ScheduleNotificationService {
  constructor(private apiService: ApiService) {}
  getAllScheduleNotificationList(): Observable<ScheduleNotification[]> {
    return this.apiService.get('/settings/notifications/scheduled').map(response => {
      console.log(response);
      return response.data;
    });
  }
  addScheduleNotification(scheduleNotificationData: ScheduleNotification): Observable<any> {
    return this.apiService.post(`/settings/addnotification`, scheduleNotificationData).map(response => {
      console.log(response);
      return response;
    });
  }

  deleteScheduleNotification(scheduleNotificationId: number): Observable<any> {
    return this.apiService.post(`/settings/notifications/delete`, {notification_id: scheduleNotificationId}).map(response => {
      console.log(response);
      return response;
    });
  }
}
