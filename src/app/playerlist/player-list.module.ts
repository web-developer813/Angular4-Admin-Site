import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PlayerListComponent } from './player-list.component';
import { PlayerListRoutes } from './player-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PlayerListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [PlayerListComponent]
})

export class PlayerListModule { }
