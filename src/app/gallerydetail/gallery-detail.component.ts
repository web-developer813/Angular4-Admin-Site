import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment/moment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { IGallery, Gallery } from '../_models';
import { AuthService, GalleryService } from '../_services';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery-detail.component.html',
    styleUrls: ['./gallery-detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {

    action: string;
    galleryId: string;
    gallery: IGallery;
    published_date: Date;
    published_time: Date;
    message = '';

    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private galleryService: GalleryService) {

        this.action = route.snapshot.params['action'];
        this.galleryId = route.snapshot.params['galleryId'] || '';
        console.log('Jaguars gallery create/edit component initialized. galleryId: ' + this.galleryId);

        this.uploader = new FileUploader({
            url: `${environment.api_url}/upload`,
            isHTML5: true,
            headers: [{
                name: 'Authkey',
                value: environment.auth_key
            }, {
                name: 'Token',
                value: this.authService.token
            }]
        });

        this.gallery = new Gallery();
        if (this.action === 'edit' && this.galleryId !== '') {
            this.galleryService.getGallery(this.galleryId).subscribe(data => {
                this.published_date = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                this.published_time = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                // data.published = moment(data.published, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDThh:mm');
                this.gallery = data;
            });
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
            // published: [null, null],
            published_date: [null, null],
            published_time: [null, null],
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
    }

    onSubmit(value, valid) {
        this.message = '';

        if (valid) {
            const photos = [];
            const _uid = this.authService.uid;
            const _galleryId = +this.galleryId;
            const _action = this.action;
            const _galleryService = this.galleryService;
            const _router = this.router;

            this.uploader.onCompleteItem = function (item, response, status, headers) {
                const res = JSON.parse(response);
                if (item.alias === 'photo') {
                    photos.push(res.uploaded_photo);
                }
                console.log(item, res, status);
            };

            this.uploader.onCompleteAll = function () {
                console.log(photos);
                const data: Gallery = {
                    gallery_id: +_galleryId,
                    title: value.title,
                    photos: photos.join(),
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _galleryService.addGallery(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['gallery_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _galleryService.updateGallery(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['gallery_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                }
            };

            if (this.uploader.queue.length > 0) {
                this.uploader.queue.forEach(item => {
                    if (item.file.type.match(/image/)) {
                        item.alias = 'photo';
                        item.upload();
                    }
                });
            } else {
                const data: Gallery = {
                    gallery_id: +_galleryId,
                    title: value.title,
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _galleryService.addGallery(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['gallery_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _galleryService.updateGallery(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['gallery_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                }
            }
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    formatString(date, time): string {
        return `Published Date: ${moment(date).format('YYYY-MM-DD')} ${moment(time).format('hh:mm A')}`;
    }
}
