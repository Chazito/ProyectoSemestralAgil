import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-agregar-solicitud-material',
  templateUrl: './agregar-solicitud-material.page.html',
  styleUrls: ['./agregar-solicitud-material.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarSolicitudMaterialPage implements OnInit {

  nombre: string = '';
  materiales: string = '';

  constructor() { }

  ngOnInit() {
  }

}
