import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserListComponent } from './user-list.component';
import { UserListRoutes } from './user-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [UserListComponent]
})

export class UserListModule { }
