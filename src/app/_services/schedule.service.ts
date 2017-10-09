import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Schedule, ScheduleScore } from '../_models';

@Injectable()
export class ScheduleService {
    constructor( private apiService: ApiService) { }

    getAllScheduleList(): Observable<Schedule[]> {
        return this.apiService.get('/schedule/all').map(response => {
            console.log('getAllScheduleList()', response);
            return response.data;
        });
    }

    getSchedule(scheduleId: string): Observable<Schedule> {
        return this.apiService.get(`/schedule/get/${scheduleId}`).map(response => {
            console.log('getSchedule()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    // addSchedule(data: Schedule): Observable<any> {
    //     return this.apiService.post(`/schedule/add`, data).map(response => {
    //         console.log('addSchedule()', response);
    //         return response;
    //     });
    // }

    updateSchedule(data: ScheduleScore): Observable<any> {
        return this.apiService.post(`/schedule/update`, data).map(response => {
            console.log('updateSchedule()', response);
            return response;
        });
    }

    // deleteSchedule(scheduleId: number): Observable<any> {
    //     return this.apiService.post(`/schedule/delete`, {schedule_id: scheduleId}).map(response => {
    //         console.log('deleteSchedule()', response);
    //         return response;
    //     });
    // }
}
