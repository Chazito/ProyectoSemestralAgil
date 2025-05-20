import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.page.html',
  styleUrls: ['./usuario-list.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UsuarioListPage implements OnInit {

  private fireService = inject(FirebaseServiceService);
  userList : Usuario[] = [];

  constructor() { 
    this.fireService.getUsuarios().subscribe(
      data =>{
        this.userList = data;
      }
    )
  }

  ngOnInit() {
  }

}
export interface Usuario{
  nombre : string;
  apellido : string;
  email : string;
}
