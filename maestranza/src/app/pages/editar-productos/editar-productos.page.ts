import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.page.html',
  styleUrls: ['./editar-productos.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarProductosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
