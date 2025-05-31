import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-proveedores',
  templateUrl: './editar-proveedores.page.html',
  styleUrls: ['./editar-proveedores.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarProveedoresPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
