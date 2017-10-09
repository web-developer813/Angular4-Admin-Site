import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MaterialModule,
    MdNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PlayerDetailComponent } from './player-detail.component';
import { PlayerDetailRoutes } from './player-detail.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PlayerDetailRoutes),
        MaterialModule,
        MdNativeDateModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule
    ],
    declarations: [PlayerDetailComponent]
})

export class PlayerDetailModule { }
