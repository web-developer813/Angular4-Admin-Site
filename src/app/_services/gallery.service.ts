import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { Gallery } from '../_models';

@Injectable()
export class GalleryService {
    constructor( private apiService: ApiService) { }

    getAllGalleryList(): Observable<Gallery[]> {
        return this.apiService.get('/gallery/all').map(response => {
            console.log('getAllGalleryList()', response);
            return response.data;
        });
    }

    getGallery(galleryId: string): Observable<Gallery> {
        return this.apiService.get(`/gallery/get/${galleryId}`).map(response => {
            console.log('getGallery()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    addGallery(data: Gallery): Observable<any> {
        return this.apiService.post(`/gallery/add`, data).map(response => {
            console.log('addGallery()', response);
            return response;
        });
    }

    updateGallery(data: Gallery): Observable<any> {
        return this.apiService.post(`/gallery/update`, data).map(response => {
            console.log('updateGallery()', response);
            return response;
        });
    }

    deleteGallery(galleryId: number): Observable<any> {
        return this.apiService.post(`/gallery/delete`, {gallery_id: galleryId}).map(response => {
            console.log('deleteGallery()', response);
            return response;
        });
    }
}
