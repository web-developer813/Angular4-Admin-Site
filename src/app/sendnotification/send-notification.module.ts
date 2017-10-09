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

import { SendNotificationComponent } from './send-notification.component';
import { SendNotificationRoutes } from './send-notification.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SendNotificationRoutes),
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
  declarations: [SendNotificationComponent]
})

export class SendNotificationModule { }
