import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment/moment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { IVideo, Video } from '../_models';
import { AuthService, VideoService } from '../_services';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-video',
    templateUrl: './video-detail.component.html',
    styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

    action: string;
    videoId: string;
    video: IVideo;
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
        private videoService: VideoService) {

        this.action = route.snapshot.params['action'];
        this.videoId = route.snapshot.params['videoId'] || '';
        console.log('Jaguars video create/edit component initialized. videoId: ' + this.videoId);

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

        this.video = new Video();
        if (this.action === 'edit' && this.videoId !== '') {
            this.videoService.getVideo(this.videoId).subscribe(data => {
                // data.published = moment(data.published, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDThh:mm');
                this.published_date = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                this.published_time = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                this.video = data;
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
            let video_url = '';
            let thumbnail = '';
            const _uid = this.authService.uid;
            const _videoId = +this.videoId;
            const _action = this.action;
            const _videoService = this.videoService;
            const _router = this.router;

            this.uploader.onCompleteItem = function (item, response, status, headers) {
                const res = JSON.parse(response);
                if (item.alias === 'video') {
                    video_url = res.uploaded_video;
                    thumbnail = res.thumbnail;
                }
                console.log(item, res, status);
            };

            this.uploader.onCompleteAll = function () {
                console.log(video_url, thumbnail);
                const data: Video = {
                    video_id: +_videoId,
                    title: value.title,
                    video_url: video_url,
                    thumbnail: thumbnail,
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _videoService.addVideo(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['video_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _videoService.updateVideo(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['video_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                }
            };

            if (this.uploader.queue.length > 0) {
                this.uploader.queue.forEach(item => {
                    item.alias = item.file.type.match(/image/) ? 'photo' : item.file.type.match(/video/) ? 'video' : 'file';
                    item.upload();
                });
            } else {
                const data: Video = {
                    video_id: +_videoId,
                    title: value.title,
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _videoService.addVideo(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['video_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _videoService.updateVideo(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['video_list']);
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
        return `Publish Date Time: ${moment(date).format('YYYY-MM-DD')} ${moment(time).format('hh:mm A')}`;
    }
}
