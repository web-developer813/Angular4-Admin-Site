import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MaterialModule,
    MdNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerModule } from 'ngx-bootstrap';

import { UserDetailComponent } from './user-detail.component';
import { UserDetailRoutes } from './user-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserDetailRoutes),
        MaterialModule,
        MdNativeDateModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxDatatableModule,
        DatepickerModule.forRoot()
    ],
    declarations: [UserDetailComponent]
})

export class UserDetailModule { }
