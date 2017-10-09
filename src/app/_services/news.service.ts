import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { News } from '../_models';

@Injectable()
export class NewsService {
    constructor( private apiService: ApiService) { }

    getAllNewsList(): Observable<News[]> {
        return this.apiService.get('/news/all').map(response => {
            console.log('getAllNewsList()', response);
            return response.data;
        });
    }

    getNews(newsId: string): Observable<News> {
        return this.apiService.get(`/news/get/${newsId}`).map(response => {
            console.log('getNews()', response);
            if (response.status === 'false') {
                console.warn(response.message);
            }
            return response.data;
        });
    }

    addNews(newsData: News): Observable<any> {
        return this.apiService.post(`/news/add`, newsData).map(response => {
            console.log('addUser()', response);
            return response;
        });
    }

    updateNews(newsData: News): Observable<any> {
        return this.apiService.post(`/news/update`, newsData).map(response => {
            console.log('updateUser()', response);
            return response;
        });
    }

    deleteNews(newsId: number): Observable<any> {
        return this.apiService.post(`/news/delete`, {news_id: newsId}).map(response => {
            console.log('deleteUser()', response);
            return response;
        });
    }
}
