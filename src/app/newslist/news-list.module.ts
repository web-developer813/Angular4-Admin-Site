import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NewsListComponent } from './news-list.component';
import { NewsDetailViewComponent } from './news-detailview.component';
import { NewsListRoutes } from './news-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NewsListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [NewsListComponent],
    // entryComponents: [NewsDetailViewComponent]
})

export class NewsListModule { }
