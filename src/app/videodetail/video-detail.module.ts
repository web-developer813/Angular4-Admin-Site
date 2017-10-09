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
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DatepickerModule, TimepickerModule } from 'ngx-bootstrap';

import { VideoDetailComponent } from './video-detail.component';
import { VideoDetailRoutes } from './video-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VideoDetailRoutes),
        MaterialModule,
        MdNativeDateModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxDatatableModule,
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
    ],
    declarations: [VideoDetailComponent]
})

export class VideoDetailModule { }
