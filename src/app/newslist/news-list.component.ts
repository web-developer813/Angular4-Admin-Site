import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { NewsService } from '../_services';
import { NewsDetailViewComponent } from './news-detailview.component';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {
    rows = [];
    selected: any[] = [];
    temp = [];

    dialogRef: MdDialogRef<NewsDetailViewComponent>;
    config: MdDialogConfig = {
        disableClose: false,
        width: '80%',
        height: '80%',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
    };

    constructor(private router: Router, private newsService: NewsService, public dialog: MdDialog) {
        this.reloadList();
    }

    reloadList() {
        this.newsService.getAllNewsList().subscribe(data => {
            if (data) {
                this.temp = [...data];
                this.rows = data;
                console.log('all news fetched.', this.temp);
            }
        });
    }

    updateFilter(event) {
        const val = event.target.value;
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.title.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
    }

    onSelect(event) {
        console.log('Event: select', event, this.selected);
    }

    onActivate(event) {
        // console.log('Event: activate', event);
    }

    onAddNews() {
        console.log(`Event: Adding news`);
        this.router.navigate(['news/add']);
    }

    onEditNews(newsId) {
        console.log(`Event: Editing news: ${newsId}`);
        this.router.navigate(['news/edit/' + newsId]);
    }

    onDeleteNews(newsId) {
        console.log('Event: Deleting a news: ', newsId);
        if (confirm('Do you really want to delete this news?')) {
            this.newsService.deleteNews(newsId).subscribe(data => {
                console.log(data);
                if (data.status === 'true') {
                    this.reloadList();
                } else {
                    alert(data.message);
                }
            });
        }
    }

    onViewDetail(detail) {
        this.dialogRef = this.dialog.open(NewsDetailViewComponent, this.config);
        this.dialogRef.componentInstance.detail = detail;
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef = null;
        });
    }
}
