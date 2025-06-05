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
  imports: [IonInput, IonItem, IonLabel, IonList, IonCardContent, IonButton, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AgregarBodegaPage implements OnInit {

  nombreBodega: string = "";
  direccionBodega: string = "";

  constructor(private fireService: FirebaseServiceService, private router: Router) { }

  ngOnInit() {
  }

  async agregarBodega() {

    // Validar que no estén vacíos (incluyendo capacidad)
    if (!this.nombreBodega?.trim() || !this.direccionBodega?.trim()) {
      this.fireService.presentAlert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar longitud nombre
    if (this.nombreBodega.trim().length < 5) {
      this.fireService.presentAlert('Error', 'El nombre de la bodega debe tener al menos 8 caracteres');
      return;
    }

    // Validar longitud dirección
    if (this.direccionBodega.trim().length < 5) {
      this.fireService.presentAlert('Error', 'La dirección de la bodega debe tener al menos 10 caracteres');
      return;
    }

    const bodega = {
      nombreBodega: this.nombreBodega.trim(),
      direccionBodega: this.direccionBodega.trim(),
    };



    try {
      await this.fireService.agregarBodega(bodega);
      this.fireService.presentAlert('Exito', 'Bodega agregado con éxito');
      this.router.navigate(['/bodegas']);
      this.limpiarFormulario();
    } catch (error) {
      console.error('Error al agregar Bodega:', error);
      this.fireService.presentAlert('Error', 'Hubo un error al guardar el Bodega');
    }
  }

  limpiarFormulario() {
    this.nombreBodega = '';
    this.direccionBodega = '';
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/bodegas']);
  }
}