import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonSpinner]
})
export class HomePage implements OnInit {
  lowStockAlerts: any[] = [];
  loading = true;

  rolesAlertas: number[] = [0, 1, 2];

  constructor(
    private firebaseService: FirebaseServiceService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    try {
      const user = await firstValueFrom(this.userService.user$);
      if (user && this.rolesAlertas.includes(user.rol)) {
        this.lowStockAlerts = await this.firebaseService.getLowStockAlertsOnce();
      }
    } catch (err) {
      console.error('Error loading alerts or user:', err);
    } finally {
      this.loading = false;
    }
  }
}
