import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ScheduleNotificationListComponent } from './schedule-notification-list.component';
import { ScheduleNotificationListRoutes } from './schedule-notification-list.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleNotificationListRoutes),
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [ScheduleNotificationListComponent]
})

export class ScheduleNotificationListModule { }
