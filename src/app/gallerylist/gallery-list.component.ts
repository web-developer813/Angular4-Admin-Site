import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GalleryService } from '../_services';

@Component({
    selector: 'app-gallery-list',
    templateUrl: './gallery-list.component.html',
    styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent {
    rows = [];
    selected: any[] = [];
    temp = [];

    constructor(private router: Router, private galleryService: GalleryService) {
        this.reloadList();
    }

    reloadList() {
        this.galleryService.getAllGalleryList().subscribe(data => {
            if (data) {
                this.temp = [...data];
                this.rows = data;
                console.log('gallerys fetched.', this.temp);
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

    onAddGallery() {
        console.log(`Event: Adding gallery`);
        this.router.navigate(['gallery/add']);
    }

    onEditGallery(galleryId) {
        console.log(`Event: Editing gallery: ${galleryId}`);
        this.router.navigate(['gallery/edit/' + galleryId]);
    }

    onDeleteGallery(galleryId) {
        console.log('Event: Deleting an gallery: ', galleryId);
        if (confirm('Do you really want to delete this news?')) {
            this.galleryService.deleteGallery(galleryId).subscribe(data => {
                console.log(data);
                if (data.status === 'true') {
                    this.reloadList();
                } else {
                    alert(data.message);
                }
            });
        }
    }

    parsePhotos(photos: string) {
        return photos.split(',');
    }
}
