import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.page.html',
  styleUrls: ['./agregar-proyecto.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class AgregarProyectoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
