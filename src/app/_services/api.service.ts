import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    private setHeaders(): Headers {
        const headersConfig = {
            'Accept': 'application/json',
            'Authkey': environment.auth_key
        };
        if (this.authService.token) {
            headersConfig['Token'] = this.authService.token;
        }
        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        const options = new RequestOptions({ headers: this.setHeaders(), search: params });
        return this.http.get(`${environment.api_url}${path}`, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                console.log(res);
                return res.json();
            });
    }

    post(path: string, body: Object = {}): Observable<any> {
        const options = new RequestOptions({ headers: this.setHeaders() });
        const data = new FormData();
        Object.keys(body).map(key => {
            data.append(key, body[key]);
        });
        return this.http.post(`${environment.api_url}${path}`, data, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                console.log(res);
                return res.json();
            });
    }

    put(path: string, body: Object = {}): Observable<any> {
        const options = new RequestOptions({ headers: this.setHeaders() });
        const data = new FormData();
        Object.keys(body).map(key => {
            data.append(key, body[key]);
        });
        return this.http.put(`${environment.api_url}${path}`, data, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                console.log(res);
                return res.json();
            });
    }

    delete(path): Observable<any> {
        const options = new RequestOptions({ headers: this.setHeaders() });
        return this.http.delete(`${environment.api_url}${path}`, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                console.log(res);
                return res.json();
            });
    }

}
