import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonButton, IonCardContent, IonList, IonLabel, IonItem, IonCardTitle, IonText, IonInput } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-bodega',
  templateUrl: './agregar-bodega.page.html',
  styleUrls: ['./agregar-bodega.page.scss'],
  standalone: true,
  imports: [IonInput, IonText, IonCardTitle, IonItem, IonLabel, IonList, IonCardContent, IonButton, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarBodegaPage implements OnInit {

  codigoBodega: string = "";
  nombreBodega: string = "";
  direccionBodega: string = "";
  capacidad: number | null = null; 
  mensajeErrorCapacidad: string = '';

  constructor(private fireService: FirebaseServiceService, private router: Router) { }

  ngOnInit() {
  }

  async agregarBodega() {
    
    this.mensajeErrorCapacidad = '';

    // Validar que no estén vacíos (incluyendo capacidad)
    if (!this.codigoBodega?.trim() || !this.nombreBodega?.trim() || !this.direccionBodega?.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }

     if (this.codigoBodega.trim().length < 3) {
      alert('El codgio de la bodega debe tener al menos 3 caracteres');
      return;
    }

    // Validar longitud nombre
    if (this.nombreBodega.trim().length < 5) {
      alert('El nombre de la bodega debe tener al menos 8 caracteres');
      return;
    }

    // Validar longitud dirección
    if (this.direccionBodega.trim().length < 5) {
      alert('La dirección de la bodega debe tener al menos 10 caracteres');
      return;
    }

    // Validación mejorada de capacidad
    if (this.capacidad === null || this.capacidad === undefined || this.capacidad === 0) {
      this.mensajeErrorCapacidad = 'La capacidad es obligatoria';
      return;
    }


    const capacidad = typeof this.capacidad === 'string' ? parseFloat(this.capacidad) : this.capacidad;

    if (isNaN(capacidad)) {
      this.mensajeErrorCapacidad = 'La capacidad debe ser un número válido';
      return;
    }

    if (capacidad < 1) {
      this.mensajeErrorCapacidad = 'La capacidad no puede ser menor a 1';
      return;
    }

    if (!Number.isInteger(capacidad)) {
      this.mensajeErrorCapacidad = 'No se permiten decimales en la capacidad';
      return;
    }

    // Si llegamos aquí, todas las validaciones pasaron
    this.mensajeErrorCapacidad = '';
    

  const bodega = {
    codigoBodega: this.codigoBodega.trim(),
    nombreBodega: this.nombreBodega.trim(),
    direccionBodega: this.direccionBodega.trim(),
    capacidad: this.capacidad!,
  };



    try {
    await this.fireService.agregarBodega( bodega);
    alert('Bodega agregado con éxito');
    this.router.navigate(['/listar-bodega']);
    this.limpiarFormulario();
  } catch (error) {
    console.error('Error al agregar Bodega:', error);
    alert('Hubo un error al guardar el Bodega');
  }
  }

  limpiarFormulario() {
    this.codigoBodega = '';
    this.nombreBodega = '';
    this.direccionBodega = '';
    this.capacidad = null; // Cambiar a null en lugar de 0
    this.mensajeErrorCapacidad = '';
  }
  
  cancelar(){
    this.limpiarFormulario();
    this.router.navigate(['/agregar-bodega']);
  }
}