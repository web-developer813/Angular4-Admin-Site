import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { ScheduleNotificationService } from '../_services';

@Component({
  selector: 'app-schedule-notification-list',
  templateUrl: './schedule-notification-list.component.html',
  styleUrls: ['./schedule-notification-list.component.scss']
})

export class ScheduleNotificationListComponent {
  rows = [];
  selected = [];
  temp = [];

  constructor(private router: Router, private scheduleNotificationService: ScheduleNotificationService) {
    this.reloadList();
  }
  reloadList() {
    this.scheduleNotificationService.getAllScheduleNotificationList().subscribe(data => {
      if (data) {
        this.temp = [...data];
        // this.setDate(data);
        // this.rows = data;
        this.rows = this.setDate(data);
        console.log('schedules fetched.', this.temp);
      }
    });
  }
  setDate(data) {
    for (let i = 0; i < data.length; i++) {
      data[i]['notification_datetime'] = moment.unix(data[i]['notification_datetime']).format('MM/DD/YYYY hh:mm  A');
    }
    return data;
  }

  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.notification && d.notification.toLowerCase().indexOf(val) !== -1 ;
    });
    // update the rows
    this.rows = temp;
  }
  onSelect(event) {
    console.log('Event: select', event, this.selected);
  }
  onAddScheduleNotification() {
    console.log(`Event: Adding schedule notification`);
    this.router.navigate(['schedule_notification/add']);
  }
  onDeleteScheduleNotification(scheduleNotificationId) {
    console.log(scheduleNotificationId);
    if (confirm('Do you really want to delete this Notification?')) {
      this.scheduleNotificationService.deleteScheduleNotification(scheduleNotificationId).subscribe(data => {
        console.log(data);
        if (data.status === 'true') {
          this.reloadList();
        } else {
          alert(data.message);
        }
      });
    }
  }
}
