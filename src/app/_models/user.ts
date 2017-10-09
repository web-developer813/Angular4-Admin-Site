export interface IUser {
    $key?: number;
    $exists?: any;

    user_id: number;
    full_name: string;
    email_address: string;
    birthday?: string;
    phone?: string;
    created?: number;
    active?: string;
    admin?: string;
    profile_avatar?: string;
}

export class User {
    user_id: number;
    full_name: string;
    email_address: string;
    birthday?: string;
    phone?: string;
    created?: number;
    active?: string;
    admin?: string;
    profile_avatar?: string;

    constructor() {
        this.user_id = 0;
        this.full_name = '';
        this.email_address = '';
        this.birthday = '';
        this.phone = '';
        this.created = new Date().getTime();
        this.active = '';
        this.admin = '';
        this.profile_avatar = '';
    }
}
