import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment/moment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { UserService } from '../_services';
import { IUser, User } from '../_models';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    selector: 'app-user',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    action: string;
    userId: string;
    user: IUser;
    message = '';
    birthday: Date;

    uploader: FileUploader = new FileUploader({
        url: URL,
        isHTML5: true
    });
    hasBaseDropZoneOver = false;

    public form: FormGroup;
    public title: AbstractControl;
    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) {

        this.action = route.snapshot.params['action'];
        this.userId = route.snapshot.params['userId'] || 0;
        console.log('Jaguars user create/edit component initialized. userId: ' + this.userId);

        this.user = new User();
        if (this.action === 'edit' && this.userId !== '') {
            this.userService.getUser(this.userId).subscribe(data => {
                if (data.birthday) {
                    this.birthday = moment(data.birthday, 'YYYY-MM-DD').toDate();
                } else {
                    this.birthday = new Date();
                }
                this.user = data;
            });
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            user_id: [null, null],
            full_name: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
            email_address: [null, Validators.compose([Validators.required, Validators.email])],
            birthday: [null, null],
            active: [null, null],
            admin: [null, null],
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
    }

    onSubmit(value, valid) {
        this.message = '';
        if (valid) {
            const data: User = {
                user_id: +this.userId,
                full_name: value.full_name,
                email_address: value.email_address,
                birthday: moment(this.birthday).format('YYYY-MM-DD'),
                active: value.active ? 'Yes' : 'No',
                admin: value.admin ? 'Yes' : 'No'
            };

            this.ngZone.run(() => {
                if (this.action === 'add') {
                    this.userService.addUser(data).subscribe((response) => {
                        if (response.status === 'true') {
                            this.router.navigate(['user_list']);
                        } else {
                            this.message = response.message;
                        }
                    });
                } else {
                    this.userService.updateUser(data).subscribe((response) => {
                        if (response.status === 'true') {
                            this.router.navigate(['user_list']);
                        } else {
                            this.message = response.message;
                        }
                    });
                }
            });
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
