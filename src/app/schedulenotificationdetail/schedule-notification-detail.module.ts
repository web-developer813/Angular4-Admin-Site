import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  MdNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule, TimepickerModule } from 'ngx-bootstrap';

import { ScheduleNotificationDetailComponent } from './schedule-notification-detail.component';
import { ScheduleNotificationDetailRoutes } from './schedule-notification-detail.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleNotificationDetailRoutes),
    MaterialModule,
    MdNativeDateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  declarations: [ScheduleNotificationDetailComponent]
})

export class ScheduleNotificationDetailModule { }
