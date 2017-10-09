import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'environments/environment';

@Injectable()
export class AuthService {

    public token: string;
    public uid: number;

    constructor(
        private http: Http,
    ) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.uid = currentUser && +currentUser.user_id;
    }

    private formatErrors(error: any) {
        return Observable.throw(error.json());
    }

    login(email: string, password: string): Observable<any> {
        const headersConfig = {
            'Accept': 'application/json',
            'Authkey': environment.auth_key
        };
        const options = new RequestOptions({ headers: new Headers(headersConfig) });

        // const body = JSON.stringify({ email: email, password: password });

        // should pass FormData object to slim api as slim's defect
        const data = new FormData();
        data.append('email_address', email);
        data.append('password', password);

        return this.http.post(`${environment.api_url}/user/login`, data, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                const response = res.json();
                console.log('user logged in: ', response);
                if (response.status === 'true' && response.data) {
                    const token = response.data.token;
                    if (token) {
                        this.token = token;
                        if (localStorage.getItem('remember') === 'true') {
                            localStorage.setItem('currentUser', JSON.stringify(response.data));
                        } else {
                            sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                        }
                    }
                }
                return response;
            });
    }

    logout(): void {
        this.token = null;
        localStorage.clear();
        sessionStorage.clear();
    }

    forgotPassword(email: string): Observable<any> {
        const headersConfig = {
            'Accept': 'application/json',
            'Authkey': environment.auth_key
        };

        const options = new RequestOptions({ headers: new Headers(headersConfig) });
        const data = new FormData();
        data.append('email_address', email);

        return this.http.post(`${environment.api_url}/user/forgotpassword`, data, options)
            .catch(this.formatErrors)
            .map((res: Response) => {
                return res.json();
            });

    }
}
