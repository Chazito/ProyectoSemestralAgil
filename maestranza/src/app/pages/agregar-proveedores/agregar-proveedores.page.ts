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

  // Variables enlazadas al formulario
  rut: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';

  constructor(private router : Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-proveedores']); // cambia según donde quieras volver
  }

  limpiarFormulario() {
    this.rut = '';
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.direccion = '';
  }

}
