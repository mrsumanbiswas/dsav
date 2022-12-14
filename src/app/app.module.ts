import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// firebase config
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
// material theme
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Swiper package
import {  SwiperModule} from "swiper/angular";

// components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AccountComponent } from './components/auth/account/account.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { UploadPhotosComponent } from './components/upload-photos/upload-photos.component';
import { DataLoadingComponent } from './components/data-loading/data-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,
    PhotosComponent,
    UploadPhotosComponent,
    DataLoadingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
