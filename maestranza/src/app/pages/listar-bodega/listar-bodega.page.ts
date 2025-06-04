import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-listar-bodega',
  templateUrl: './listar-bodega.page.html',
  styleUrls: ['./listar-bodega.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarBodegaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
