import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonItem, IonLabel, IonList, IonInput
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-solicitud-material',
  templateUrl: './editar-solicitud-material.page.html',
  styleUrls: ['./editar-solicitud-material.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonItem, IonLabel, IonList, IonInput,
    CommonModule, FormsModule
  ]
})
export class EditarSolicitudMaterialPage implements OnInit {

  nombre: string = '';
  materiales: string = '';

  constructor(private router: Router) {}

  ngOnInit() {

  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-solicitud-material']); 
  }

  limpiarFormulario() {
    this.nombre = '';
    this.materiales = '';
  }

  editarSolicitud() {
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

    // Simulación de guardado
    console.log('Solicitud editada:', {
      nombre: this.nombre,
      materiales: this.materiales
    });

    alert('Solicitud editada correctamente');
    this.router.navigate(['/listar-solicitud-material']); 
  }
}
