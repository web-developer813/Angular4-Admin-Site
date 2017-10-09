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

import { GalleryDetailComponent } from './gallery-detail.component';
import { GalleryDetailRoutes } from './gallery-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GalleryDetailRoutes),
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
    declarations: [GalleryDetailComponent]
})

export class GalleryDetailModule { }
