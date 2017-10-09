import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { ScheduleService } from '../_services';

import * as moment from 'moment/moment';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent {
    rows = [];
    selected = [];
    temp = [];
    timezones = [];
    selectedTimezone: any;

    constructor(private router: Router, private scheduleService: ScheduleService) {
        this.reloadList();
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

    reloadList() {
        this.scheduleService.getAllScheduleList().subscribe(data => {
            if (data) {
                this.temp = [...data];
                this.rows = data;
                console.log('schedules fetched.', this.temp);
            }
        });
    }

    updateFilter(event) {
        const val = event.target.value;
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.homeTeam && d.homeTeam.toLowerCase().indexOf(val) !== -1 ||
                d.awayTeam && d.awayTeam.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
    }

    onSelect(event) {
        console.log('Event: select', event, this.selected);
    }

    onActivate(event) {
        // console.log('Event: activate', event);
    }

    onAddSchedule() {
        console.log(`Event: Adding schedule`);
        this.router.navigate(['schedule/add']);
    }

    onEditSchedule(scheduleId) {
        console.log(`Event: Editing schedule: ${scheduleId}`);
        this.router.navigate(['schedule/edit/' + scheduleId]);
    }

    OnUpdateSchedule(scheduleId) {
      console.log(`Event: Updating schedule: ${scheduleId}`);
      this.router.navigate(['schedule/update/' + scheduleId]);
    }

    // onDeleteSchedule(scheduleId) {
    //     console.log('Event: Deleting a schedule: ', scheduleId);
    //     if (confirm('Do you really want to delete this schedule?')) {
    //         this.scheduleService.deleteSchedule(scheduleId).subscribe(data => {
    //             console.log(data);
    //             if (data.status === 'true') {
    //                 this.reloadList();
    //             } else {
    //                 alert(data.message);
    //             }
    //         });
    //     }
    // }

    getTimezoneText(value) {
      this.selectedTimezone = this.timezones.find(item => item.abbr === value);
      console.log(this.selectedTimezone)
      if ( this.selectedTimezone ) {
        return this.selectedTimezone.text;
      }else {
        return '';
      }
      // return _.find(this.timezones, { 'value': value }).text;
    }
    changeTimezone(value) {
      return `${moment(value).format('MM/DD/YYYY')} ${moment(value).format('hh:mm A')}`;
    }
}
