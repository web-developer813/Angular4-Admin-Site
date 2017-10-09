export interface IGallery {
    $key?: number;
    $exists?: any;

    gallery_id: number;
    title: string;
    photos?: string;
    published?: string;
    created?: Date;
    user_id?: number;
}

export class Gallery {
    gallery_id: number;
    title: string;
    photos?: string;
    published?: string;
    created?: Date;
    user_id?: number;

    constructor() {
        this.gallery_id = 0;
        this.title = '';
        this.photos = '';
        this.published = '';
        this.created = new Date();
        this.user_id = 0;
    }
}
