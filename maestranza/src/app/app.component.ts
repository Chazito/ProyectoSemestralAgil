import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {cubeOutline, logOutOutline} from 'ionicons/icons';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote,
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,
    CommonModule, RouterModule
  ],
})
export class AppComponent implements OnInit {
  user: any = null;
  appPages = [
    { title: 'Vista Inventario', url: '/vista-inventario', icon: 'cube-outline' },
  ];

  constructor(private router: Router, private userService : UserService) {
    addIcons({cubeOutline, logOutOutline});
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  ngOnInit(): void {
    this.userService.user$.subscribe( user =>{
      this.user = user;
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

}
