import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { VideoListComponent } from './video-list.component';
import { VideoListRoutes } from './video-list.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VideoListRoutes),
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule
    ],
    declarations: [VideoListComponent]
})

export class VideoListModule { }
