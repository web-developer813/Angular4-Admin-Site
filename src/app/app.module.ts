import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';


import {
    ApiService,
    AuthService,
    UserService,
    NewsService,
    PlayerService,
    ScheduleService,
    VideoService,
    GalleryService,
    LiveStreamService,
    ScheduleNotificationService,
    SendNotificationService
} from './_services';
import { AuthGuard, AdminGuard } from './_guards';

import { NewsDetailViewComponent } from './newslist/news-detailview.component';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export const firebaseConfig = {
  apiKey: 'AIzaSyDKxuYgENyaYN-OYUWDRQEhUuTQSdc6PlI',
  databaseURL: 'https://jaguars-ac743.firebaseio.com/',
};

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        NewsDetailViewComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        MaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule
    ],
    providers: [
        AuthGuard,
        AdminGuard,
        AuthService,
        ApiService,
        UserService,
        NewsService,
        PlayerService,
        ScheduleService,
        VideoService,
        GalleryService,
        LiveStreamService,
        ScheduleNotificationService,
        SendNotificationService
    ],
    bootstrap: [AppComponent],
    entryComponents: [NewsDetailViewComponent]
})
export class AppModule { }
