import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proveedores',
  templateUrl: './agregar-proveedores.page.html',
  styleUrls: ['./agregar-proveedores.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarProveedoresPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/home']); // cambia según donde quieras volver
  }

}
