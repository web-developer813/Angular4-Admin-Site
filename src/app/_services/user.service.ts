import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor( private apiService: ApiService) { }

    getAllUserList(): Observable<User[]> {
        return this.apiService.get('/user/all').map(response => {
            console.log('getAllUserList()', response);
            return response.data;
        });
    }

    getUser(userId: string): Observable<User> {
        return this.apiService.get(`/user/get/${userId}`).map(response => {
            console.log('getUser()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    addUser(userData: User): Observable<any> {
        return this.apiService.post('/user/add', userData).map(response => {
            console.log('addUser()', response);
            return response;
        });
    }

    updateUser(userData: User): Observable<any> {
        return this.apiService.post('/user/update', userData).map(response => {
            console.log('updateUser()', response);
            return response;
        });
    }

    deleteUser(userId: number): Observable<any> {
        return this.apiService.post('/user/delete', {userId}).map(response => {
            console.log('deleteUser()', response);
            return response;
        });
    }
}
