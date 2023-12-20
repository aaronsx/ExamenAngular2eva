import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './Vistas/core/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ludotica-455a4","appId":"1:1021218986725:web:16e2cd5164fde0eb24920c","storageBucket":"ludotica-455a4.appspot.com","apiKey":"AIzaSyBKEw60F4QYYs42cZ8zeVvIyXC5sYt0Bi8","authDomain":"ludotica-455a4.firebaseapp.com","messagingSenderId":"1021218986725"})),
    provideFirestore(() => getFirestore()),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
