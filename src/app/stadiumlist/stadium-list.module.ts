import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StadiumListComponent } from './stadium-list.component';
import { StadiumListRoutes } from './stadium-list.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StadiumListRoutes),
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [StadiumListComponent]
})

export class StadiumListModule { }
