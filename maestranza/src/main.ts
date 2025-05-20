import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';

if(environment.production){
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=>getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "proyectomaestranza-ea63a", appId: "1:1039361181197:web:6b2e72ef865bc9eb1d7744", storageBucket: "proyectomaestranza-ea63a.firebasestorage.app", apiKey: "AIzaSyCXEMXYnYBIQ578xu-y8iEErzSjIUJfS7U", authDomain: "proyectomaestranza-ea63a.firebaseapp.com", messagingSenderId: "1039361181197", measurementId: "G-8GTJBH2M4F" })), provideFirestore(() => getFirestore()),
  ],
});
