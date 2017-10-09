import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleListRoutes } from './schedule-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ScheduleListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [ScheduleListComponent]
})

export class ScheduleListModule { }
