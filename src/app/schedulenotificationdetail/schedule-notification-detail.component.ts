import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment/moment';

import { ScheduleNotificationService } from '../_services';
import { IScheduleNotification, ScheduleNotification } from '../_models';

// declare var moment: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-notification-detail.component.html',
  styleUrls: ['./schedule-notification-detail.component.scss']
})
export class ScheduleNotificationDetailComponent implements OnInit {

  action: string;
  scheduleNotificationId: string;
  scheduleNotification: IScheduleNotification;
  schedule_date: Date;
  schedule_time: Date;
  schedule_message: string
  schedule_dateTime: string;
  schedule_timestamp: number;
  message = '';
  timezones = [];

  public form: FormGroup;
  public title: AbstractControl;
  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleNotificationService: ScheduleNotificationService) {

    this.action = route.snapshot.params['action'];
    this.scheduleNotificationId = route.snapshot.params['scheduleNotificationId'] || 0;
    console.log('Jaguars schedule create/edit component initialized. scheduleId: ' + this.scheduleNotificationId);

    this.scheduleNotification = new ScheduleNotification();
  }


  ngOnInit() {
    this.form = this.fb.group({
      schedule_id: [null, null],
      schedule_message: [null, Validators.compose([Validators.required])],
      schedule_date: [null, null],
      schedule_time: [new Date(), null],
    });
    this.form.valueChanges.subscribe(() => { this.message = ''; });
  }

  onSubmit(value, valid) {
    this.message = '';
    if (valid) {
      this.schedule_dateTime = `${moment(this.schedule_date).format('YYYY-MM-DD')} ${moment(this.schedule_time).format('HH:mm')}`;
      this.schedule_timestamp = moment(this.schedule_dateTime).unix();

      const data: ScheduleNotification = {
        schedule_id: +this.scheduleNotificationId,
        message: this.schedule_message,
        datetime: this.schedule_timestamp,
      };
      this.scheduleNotificationService.addScheduleNotification(data).subscribe(response => {
        if (response.status === 'true') {
          this.router.navigate(['schedule_notification_list']);
        } else {
          alert(response.message);
        }
      });
    }
  }


}
