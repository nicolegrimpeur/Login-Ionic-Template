import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCIcJb6uH0rqow04l_bw1UEV-DgFnejtEk',
  authDomain: 'login-ionic-bbab9.firebaseapp.com',
  projectId: 'login-ionic-bbab9',
  storageBucket: 'login-ionic-bbab9.appspot.com',
  messagingSenderId: '185323324948',
  appId: '1:185323324948:web:e06845cdec0b7183d38901',
  measurementId: 'G-7WRTBHFW38'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
