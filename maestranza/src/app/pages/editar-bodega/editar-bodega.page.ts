import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-bodega',
  templateUrl: './editar-bodega.page.html',
  styleUrls: ['./editar-bodega.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarBodegaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
