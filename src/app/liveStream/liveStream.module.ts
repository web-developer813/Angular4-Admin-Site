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
import { QuillModule } from 'ngx-quill';

import { LiveStreamComponent } from './liveStream.component';
import { LiveStreamRoutes } from './liveStream.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LiveStreamRoutes),
    MaterialModule,
    MdNativeDateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    QuillModule,
  ],
  declarations: [LiveStreamComponent]
})

export class LiveStreamModule { }
