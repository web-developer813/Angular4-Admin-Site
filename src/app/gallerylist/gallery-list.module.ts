import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { GalleryListComponent } from './gallery-list.component';
import { GalleryListRoutes } from './gallery-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GalleryListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [GalleryListComponent]
})

export class GalleryListModule { }
