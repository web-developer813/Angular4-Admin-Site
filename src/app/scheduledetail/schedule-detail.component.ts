import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment/moment';

import { ScheduleService } from '../_services';
import { ISchedule, Schedule, IScheduleScore, ScheduleScore } from '../_models';

// declare var moment: any;

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule-detail.component.html',
    styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {

    action: string;
    scheduleId: string;
    schedule: ISchedule;
    schedule_date: Date;
    schedule_time: Date;
    scheduleScore: IScheduleScore;
    message = '';
    timezones = [];

    public form: FormGroup;
    public title: AbstractControl;
    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private scheduleService: ScheduleService) {

        this.action = route.snapshot.params['action'];
        this.scheduleId = route.snapshot.params['scheduleId'] || 0;
        console.log('Jaguars schedule create/edit component initialized. scheduleId: ' + this.scheduleId);

        this.schedule = new Schedule();
        if (this.action === 'update' && this.scheduleId !== '') {
            this.scheduleService.getSchedule(this.scheduleId).subscribe(data => {
                // data.schedule_time = moment(data.schedule_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDThh:mm');
                if (data.schedule_time) {
                    this.schedule_date = moment(data.schedule_time, 'YYYY-MM-DD HH:mm:ss').toDate();
                    this.schedule_time = moment(data.schedule_time, 'YYYY-MM-DD HH:mm:ss').toDate();
                } else {
                    this.schedule_date = new Date();
                    this.schedule_time = new Date();
                }
                this.schedule = data;
            });
        }
        this.fetch((data) => { this.timezones = data; });
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/timezones.json`);
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.send();
    }

    ngOnInit() {
        this.form = this.fb.group({
            schedule_id: [null, null],
            home_team_score: [null, Validators.compose([Validators.required])],
            away_team_score: [null, Validators.compose([Validators.required])],
            // home_team: [null, Validators.compose([Validators.required])],
            // away_team: [null, Validators.compose([Validators.required])],
            // schedule_date: [null, Validators.compose([Validators.required])],
            // schedule_time: [null, Validators.compose([Validators.required])],
            // timezone: [null, Validators.compose([Validators.required])],
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
    }

    onSubmit(value, valid) {
        this.message = '';
        if (valid) {
          if (this.action === 'update') {
            const data: ScheduleScore = {
              schedule_id: +this.scheduleId,
              home_team_score: value.home_team_score,
              away_team_score: value.away_team_score
            };
            this.scheduleService.updateSchedule(data).subscribe((response) => {
                if (response.status === 'true') {
                    this.router.navigate(['schedule_list']);
                } else {
                    this.message = response.message;
                }
            });
          }
            // console.log('Schedule submitted: ', data);
            // this.ngZone.run(() => {
            //     if (this.action === 'add') {
            //         this.scheduleService.addSchedule(data).subscribe((response) => {
            //             if (response.status === 'true') {
            //                 this.router.navigate(['schedule_list']);
            //             } else {
            //                 this.message = response.message;
            //             }
            //         });
            //     } else {
            //         this.scheduleService.updateSchedule(data).subscribe((response) => {
            //             if (response.status === 'true') {
            //                 this.router.navigate(['schedule_list']);
            //             } else {
            //                 this.message = response.message;
            //             }
            //         });
            //     }
            // });
        }
    }

    formatString(date, time): string {
        return `Schedule Time: ${moment(date).format('YYYY-MM-DD')} ${moment(time).format('hh:mm A')}`;
    }
}
