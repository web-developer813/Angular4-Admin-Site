import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
    selector: 'app-news-detail-view-dialog',
    templateUrl: './news-detailview.component.html',
    styleUrls: ['./news-detailview.component.scss']
})
export class NewsDetailViewComponent {
    detail = '';
    constructor(public dialogRef: MdDialogRef <NewsDetailViewComponent>) { }
}
