import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard, AdminGuard } from './_guards';

export const AppRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './liveStream/liveStream.module#LiveStreamModule'
    }, {
      path: 'schedule_notification_list',
      loadChildren: './schedulenotificationlist/schedule-notification-list.module#ScheduleNotificationListModule'
    }, {
      path: 'schedule_notification/:action',
      loadChildren: './schedulenotificationdetail/schedule-notification-detail.module#ScheduleNotificationDetailModule'
    }, {
      path: 'schedule_notification/:action/:newsId',
      loadChildren: './schedulenotificationdetail/schedule-notification-detail.module#ScheduleNotificationDetailModule'
    }, {
      path: 'send-notification',
      loadChildren: './sendnotification/send-notification.module#SendNotificationModule'
    }, {
      path: 'stadium-list',
      loadChildren: './stadiumlist/stadium-list.module#StadiumListModule'
    }, {
        path: 'user_list',
        loadChildren: './userlist/user-list.module#UserListModule',
        canActivate: [AdminGuard]
    }, {
        path: 'user/:action',
        loadChildren: './userdetail/user-detail.module#UserDetailModule',
        canActivate: [AdminGuard]
    }, {
        path: 'user/:action/:userId',
        loadChildren: './userdetail/user-detail.module#UserDetailModule',
        canActivate: [AdminGuard]
    }, {
        path: 'news_list',
        loadChildren: './newslist/news-list.module#NewsListModule'
    }, {
        path: 'news/:action',
        loadChildren: './newsdetail/news-detail.module#NewsDetailModule'
    }, {
        path: 'news/:action/:newsId',
        loadChildren: './newsdetail/news-detail.module#NewsDetailModule'
    }, {
        path: 'video_list',
        loadChildren: './videolist/video-list.module#VideoListModule'
    }, {
        path: 'video/:action',
        loadChildren: './videodetail/video-detail.module#VideoDetailModule'
    }, {
        path: 'video/:action/:videoId',
        loadChildren: './videodetail/video-detail.module#VideoDetailModule'
    }, {
        path: 'gallery_list',
        loadChildren: './gallerylist/gallery-list.module#GalleryListModule'
    }, {
        path: 'gallery/:action',
        loadChildren: './gallerydetail/gallery-detail.module#GalleryDetailModule'
    }, {
        path: 'gallery/:action/:galleryId',
        loadChildren: './gallerydetail/gallery-detail.module#GalleryDetailModule'
    }, {
        path: 'player_list',
        loadChildren: './playerlist/player-list.module#PlayerListModule'
    }, {
        path: 'player/:action',
        loadChildren: './playerdetail/player-detail.module#PlayerDetailModule'
    }, {
        path: 'player/:action/:playerId',
        loadChildren: './playerdetail/player-detail.module#PlayerDetailModule'
    }, {
        path: 'schedule_list',
        loadChildren: './schedulelist/schedule-list.module#ScheduleListModule'
    }, {
        path: 'schedule/:action',
        loadChildren: './scheduledetail/schedule-detail.module#ScheduleDetailModule'
    }, {
        path: 'schedule/:action/:scheduleId',
        loadChildren: './scheduledetail/schedule-detail.module#ScheduleDetailModule'
    }],
    canActivate: [AuthGuard],
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'session',
        loadChildren: './session/session.module#SessionModule'
    }]
}, {
    path: '**',
    redirectTo: 'session/404'
}];
