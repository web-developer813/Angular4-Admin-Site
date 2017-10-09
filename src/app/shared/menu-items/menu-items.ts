import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
      state: '/',
      name: 'Live Stream',
      type: 'link',
      icon: 'view_list'
    },
    {
      state: 'schedule_notification_list',
      name: 'Schedule Notification',
      type: 'link',
      icon: 'view_list',
      // badge: [
      //     { type: 'blue', value: '1' }
      // ]
    },
    {
      state: 'schedule_list',
      name: 'Score Update',
      type: 'link',
      icon: 'view_list'
    },
    {
      state: 'send-notification',
      name: 'Send Notification',
      type: 'link',
      icon: 'view_list'
    },
    {
      state: 'stadium-list',
      name: 'JAX Talk',
      type: 'link',
      icon: 'view_list'
    },
    // {
    //     state: '/',
    //     name: 'HOME',
    //     type: 'link',
    //     icon: 'explore'
    // },
    // {
    //     state: 'user_list',
    //     name: 'USERS',
    //     type: 'link',
    //     icon: 'group',
    //     // badge: [
    //     //     { type: 'blue', value: '1' }
    //     // ]
    // },
    // {
    //     state: 'news_list',
    //     name: 'NEWS',
    //     type: 'link',
    //     icon: 'fiber_new',
    //     // badge: [
    //     //     { type: 'red', value: '50' }
    //     // ]
    // },
    // {
    //     state: 'video_list',
    //     name: 'VIDEO LIBRARY',
    //     type: 'link',
    //     icon: 'video_library',
    //     // badge: [
    //     //     { type: 'purple', value: '100' }
    //     // ]
    // },
    // {
    //     state: 'gallery_list',
    //     name: 'GALLERIES',
    //     type: 'link',
    //     icon: 'photo_library',
    //     // badge: [
    //     //     { type: 'purple', value: '200' }
    //     // ]
    // },
    // {
    //     state: 'player_list',
    //     name: 'ROSTERS',
    //     type: 'link',
    //     icon: 'view_list'
    // },
    // {
    //     state: 'schedule_list',
    //     name: 'SCHEDULES',
    //     type: 'link',
    //     icon: 'event_note'
    // },
];

@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    add(menu: Menu) {
        MENUITEMS.push(menu);
    }
}
