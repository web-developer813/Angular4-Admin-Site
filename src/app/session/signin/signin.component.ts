import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../_services/index';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    model: any = {
        email: '',
        password: '',
        remember: false
    };
    message = '';
    public form: FormGroup;
    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

    clearMessage() {
        this.message = '';
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])],
            remember: [null, null]
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
        this.authService.logout();
    }

    onSubmit() {
        localStorage.setItem('remember', this.model.remember + '');
        this.authService.login(this.model.email, this.model.password).subscribe(response => {
            if (response.status === 'true' && response.data && response.data.token) {
                this.router.navigate ( [ '/' ] );
            } else {
                this.message = response.message;
            }
        });
    }

}
