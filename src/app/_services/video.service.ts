import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Video } from '../_models';

@Injectable()
export class VideoService {
    constructor( private apiService: ApiService) { }

    getAllVideoList(): Observable<Video[]> {
        return this.apiService.get('/video/all').map(response => {
            console.log('getAllVideoList()', response);
            return response.data;
        });
    }

    getVideo(videoId: string): Observable<Video> {
        return this.apiService.get(`/video/get/${videoId}`).map(response => {
            console.log('getVideo()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    addVideo(data: Video): Observable<any> {
        return this.apiService.post(`/video/add`, data).map(response => {
            console.log('addVideo()', response);
            return response;
        });
    }

    updateVideo(data: Video): Observable<any> {
        return this.apiService.post(`/video/update`, data).map(response => {
            console.log('updateVideo()', response);
            return response;
        });
    }

    deleteVideo(videoId: number): Observable<any> {
        return this.apiService.post(`/video/delete`, {videoId}).map(response => {
            console.log('deleteVideo()', response);
            return response;
        });
    }
}
