export interface IVideo {
    $key?: number;
    $exists?: any;

    video_id: number;
    title: string;
    video_url?: string;
    thumbnail?: string;
    published?: string;
    created?: Date;
    user_id?: number;
}

export class Video {
    video_id: number;
    title: string;
    video_url?: string;
    thumbnail?: string;
    published?: string;
    created?: Date;
    user_id?: number;

    constructor() {
        this.video_id = 0;
        this.title = '';
        this.video_url = '';
        this.thumbnail = '';
        this.published = '';
        this.created = new Date();
        this.user_id = 0;
    }
}
