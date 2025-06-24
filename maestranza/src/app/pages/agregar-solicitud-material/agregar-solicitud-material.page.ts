import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-solicitud-material',
  templateUrl: './agregar-solicitud-material.page.html',
  styleUrls: ['./agregar-solicitud-material.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, FormsModule]
})
export class AgregarSolicitudMaterialPage implements OnInit {

  nombre: string = '';
  materiales: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/solicitudes']); // cambia la ruta según corresponda
  }

  limpiarFormulario() {
    this.nombre = '';
    this.materiales = '';
  }

  agregarSolicitud() {
    // Validación: nombre requerido y mínimo 3 caracteres
    if (!this.nombre.trim()) {
      alert('Por favor ingresa el nombre del solicitante');
      return;
    }
    if (this.nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      return;
    }

    // Validación: materiales requerido
    if (!this.materiales.trim()) {
      alert('Por favor ingresa los materiales solicitados');
      return;
    }

    // Si pasa todas las validaciones
    console.log('Solicitud agregada:', {
      nombre: this.nombre,
      materiales: this.materiales
    });

    alert('Solicitud agregada correctamente');
    this.limpiarFormulario();
    this.router.navigate(['/listar-solicitud-material']); // ajusta la ruta
  }
}

