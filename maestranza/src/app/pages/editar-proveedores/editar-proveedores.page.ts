import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonList, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-proveedores',
  templateUrl: './editar-proveedores.page.html',
  styleUrls: ['./editar-proveedores.page.scss'],
  standalone: true,
  imports: [IonList, IonLabel, IonItem, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarProveedoresPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/listar-proveedores']);
  }

}
