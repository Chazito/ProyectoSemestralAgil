import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-acceso-denegado',
  templateUrl: './acceso-denegado.page.html',
  styleUrls: ['./acceso-denegado.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AccesoDenegadoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
