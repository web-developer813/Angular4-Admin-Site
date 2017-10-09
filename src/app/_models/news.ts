export interface INews {
    $key?: number;
    $exists?: any;

    news_id: number;
    title: string;
    detail?: string;
    photo?: string;
    photo_url?: string;
    video?: string;
    video_url?: string;
    thumbnail?: string;
    published?: string;
    no_end_date?: string;
    publish_end?: string;
    created?: Date;
    active?: string;
    user_id?: number;
}

export class News {
    news_id: number;
    title: string;
    detail?: string;
    photo?: string;
    photo_url?: string;
    video?: string;
    video_url?: string;
    thumbnail?: string;
    published?: string;
    no_end_date?: string;
    publish_end?: string;
    created?: Date;
    active?: string;
    user_id?: number;

    constructor() {
        this.news_id = 0;
        this.title = '';
        this.detail = '';
        this.photo = '';
        this.photo_url = '';
        this.video = '';
        this.video_url = '';
        this.thumbnail = '';
        this.published = '';
        this.no_end_date = '';
        this.publish_end = '';
        this.created = new Date();
        this.active = '';
        this.user_id = 0;
    }
}
