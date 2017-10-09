import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { VideoService } from '../_services';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
    rows = [];
    selected: any[] = [];
    temp = [];

    constructor(private router: Router, private videoService: VideoService) {
        this.videoService.getAllVideoList().subscribe(data => {
            if (data) {
                this.temp = [...data];
                this.rows = data;
                console.log('videos fetched.', this.temp);
            }
        });
    }

    updateFilter(event) {
        const val = event.target.value;
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.title && d.title.toLowerCase().indexOf(val) !== -1 || !val;
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

    onAddVideo() {
        console.log(`Event: Adding video`);
        this.router.navigate(['video/add']);
    }

    onEditVideo(videoId) {
        console.log(`Event: Editing video: ${videoId}`);
        this.router.navigate(['video/edit/' + videoId]);
    }

    onDeleteVideo(videoId) {
        console.log('Event: Deleting an video: ', videoId);
        this.videoService.deleteVideo(videoId)
            .subscribe(data => {
                console.log(data);
            });
    }
}
