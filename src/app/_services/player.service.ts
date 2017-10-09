import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Player } from '../_models';

@Injectable()
export class PlayerService {
    constructor( private apiService: ApiService) { }

    getAllPlayerList(): Observable<Player[]> {
        return this.apiService.get('/player/all').map(response => {
            console.log('getAllPlayerList()', response);
            return response.data;
        });
    }

    getPlayer(playerId: string): Observable<Player> {
        return this.apiService.get(`/player/get/${playerId}`).map(response => {
            console.log('getPlayer()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    addPlayer(data: Player): Observable<any> {
        return this.apiService.post(`/player/add`, data).map(response => {
            console.log('addPlayer()', response);
            return response;
        });
    }

    updatePlayer(data: Player): Observable<any> {
        return this.apiService.post(`/player/update`, data).map(response => {
            console.log('updatePlayer()', response);
            return response;
        });
    }

    deletePlayer(playerId: number): Observable<any> {
        return this.apiService.post(`/player/delete`, {player_id: playerId}).map(response => {
            console.log('deletePlayer()', response);
            return response;
        });
    }
}
