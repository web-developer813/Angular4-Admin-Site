import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
// import * as Quill from 'quill';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { INews, News } from '../_models';
import { AuthService, NewsService } from '../_services';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-news',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

    action: string;
    newsId: string;
    news: INews;
    published_date: Date;
    published_time: Date;
    publish_end_date: Date;
    publish_end_time: Date;
    message = '';
    no_end_date = false;

    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    public editor;
    public editorContent = '';
    public editorOptions = {
        placeholder: 'insert content...'
    };

    public form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private authService: AuthService,
        private newsService: NewsService) {

        this.action = route.snapshot.params['action'];
        this.newsId = route.snapshot.params['newsId'] || '';
        console.log('Jaguars news create/edit component initialized. newsId: ' + this.newsId);

        this.uploader = new FileUploader({
            // url: this.action === 'add' ? `${environment.api_url}/news/add` : `${environment.api_url}/news/update`,
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

        this.news = new News();
        if (this.action === 'edit' && this.newsId !== '') {
            this.newsService.getNews(this.newsId).subscribe(data => {
                if (data.published) {
                    this.published_date = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                    this.published_time = moment(data.published, 'YYYY-MM-DD HH:mm:ss').toDate();
                } else {
                    this.published_date = new Date();
                    this.published_time = new Date();
                }
                if (data.publish_end) {
                    this.publish_end_date = moment(data.publish_end, 'YYYY-MM-DD HH:mm:ss').toDate();
                    this.publish_end_time = moment(data.publish_end, 'YYYY-MM-DD HH:mm:ss').toDate();
                } else {
                    this.publish_end_date = new Date();
                    this.publish_end_time = new Date();
                }
                this.news = data;
                this.no_end_date = data.no_end_date === 'Yes';
                if (this.no_end_date) {
                    this.publish_end_date = moment('2099-12-31 00:00:00', 'YYYY-MM-DD HH:mm:ss').toDate();
                    this.publish_end_time = moment('2099-12-31 00:00:00', 'YYYY-MM-DD HH:mm:ss').toDate();
                }
                this.ngZone.run(() => {
                    this.editorContent = this.news.detail;
                });
            });
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
            detail: [null, null],
            published_date: [null, null],
            published_time: [null, null],
            publish_end_date: [null, null],
            publish_end_time: [null, null],
            active: [null, null],
            no_end_date: [null, null],
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
    }

    onSubmit(value, valid) {
        this.message = '';

        if (valid) {
            const photo_urls = [];
            let video_url = '';
            let thumbnail = '';
            const _uid = this.authService.uid;
            const _newsId = +this.newsId;
            const _action = this.action;
            const _newsService = this.newsService;
            const _router = this.router;

            this.uploader.onCompleteItem = function (item, response, status, headers) {
                const res = JSON.parse(response);
                if (item.alias === 'photo') {
                    photo_urls.push(res.uploaded_photo);
                } else if (item.alias === 'video') {
                    video_url = res.uploaded_video;
                    thumbnail = res.thumbnail;
                }
                console.log(item, res, status);
            };

            this.uploader.onCompleteAll = function () {
                console.log(photo_urls, video_url, thumbnail);
                const data: News = {
                    news_id: +_newsId,
                    title: value.title,
                    detail: value.detail,
                    photo_url: photo_urls ? photo_urls.join() : '',
                    video_url: video_url,
                    thumbnail: thumbnail,
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    no_end_date: value.no_end_date ? 'Yes' : 'No',
                    publish_end: `${moment(this.publish_end_date).format('YYYY-MM-DD')} ${moment(this.publish_end_time).format('HH:mm:00')}`,
                    active: value.active ? 'Yes' : 'No',
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _newsService.addNews(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['news_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _newsService.updateNews(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['news_list']);
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
                const data: News = {
                    news_id: +_newsId,
                    title: value.title,
                    detail: value.detail,
                    published: `${moment(this.published_date).format('YYYY-MM-DD')} ${moment(this.published_time).format('HH:mm:00')}`,
                    no_end_date: value.no_end_date ? 'Yes' : 'No',
                    publish_end: `${moment(this.publish_end_date).format('YYYY-MM-DD')} ${moment(this.publish_end_time).format('HH:mm:00')}`,
                    active: value.active ? 'Yes' : 'No',
                    user_id: _uid
                };
                console.log(data);
                if (_action === 'add') {
                    _newsService.addNews(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['news_list']);
                        } else {
                            alert(response.message);
                        }
                    });
                } else {
                    _newsService.updateNews(data).subscribe(response => {
                        if (response.status === 'true') {
                            _router.navigate(['news_list']);
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

    formatString(): string {
        let timeString = 'Publish: ';
        if (this.published_date) {
            timeString = timeString + moment(this.published_date).format('YYYY-MM-DD') + ' ';
        } else {
            timeString = timeString + moment().format('YYYY-MM-DD') + ' ';
        }
        if (this.published_time) {
            timeString = timeString + moment(this.published_time).format('hh:mm A') + ' ';
        } else {
            timeString = timeString + moment().format('hh:mm A') + ' ';
        }
        if (!this.no_end_date) {
            if (this.publish_end_date) {
                timeString = timeString + '~ ' + moment(this.publish_end_date).format('YYYY-MM-DD') + ' ';
            } else {
                timeString = timeString + '~ ' + moment().format('YYYY-MM-DD') + ' ';
            }
            if (this.publish_end_time) {
                timeString = timeString + moment(this.publish_end_time).format('hh:mm A');
            } else {
                timeString = timeString + moment().format('hh:mm A');
            }
        } else {
            timeString = timeString + '~ 2099-12-31 00:00 AM';
        }
        return timeString;
    }

    onNoEndDateClicked(): void {
        if (this.no_end_date) {
            this.publish_end_date = moment('2099-12-31 00:00:00', 'YYYY-MM-DD HH:mm:ss').toDate();
            this.publish_end_time = moment('2099-12-31 00:00:00', 'YYYY-MM-DD HH:mm:ss').toDate();
        } else {
            this.publish_end_date = new Date();
            this.publish_end_time = new Date();
        }
    }

    onEditorCreated(quill) {
        this.editor = quill;
    }

}
