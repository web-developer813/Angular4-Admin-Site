import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { ScheduleService } from '../_services';

import * as moment from 'moment/moment';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-stadium-list',
  templateUrl: './stadium-list.component.html',
  styleUrls: ['./stadium-list.component.scss']
})
export class StadiumListComponent {

  rows = [];
  temp = [];

  items: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.items = db.list('/stadium', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'timestamp',
      } });
    this.items
      .subscribe(snapshots => {
        this.rows = [];
        snapshots.forEach(snapshot => {
          var rowItem = new Array();
          rowItem = snapshot.val();
          rowItem['itemId'] = snapshot.key;
          rowItem['message'] = atob (rowItem['message']);
          this.rows.push(rowItem);
        });
        this.temp = this.rows;
      });

  }

  updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.message && d.message.toLowerCase().indexOf(val) !== -1 ||
             d.itemId && d.itemId.toLowerCase().indexOf(val) !== -1 ;
    });
    // update the rows
    this.rows = temp;
  }

  onDeleteStadium (ItemID) {
    if (confirm('Do you really want to delete this Message?')) {
      this.items.remove(ItemID);
    }
  }

  changeTimezone(value) {
    return moment.unix(value).format('MM/DD/YYYY hh:mm  A');
  }

}
