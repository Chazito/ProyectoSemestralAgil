import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList,
  IonItem, IonButton, IonSelect, IonSelectOption, IonCard, IonCardContent, IonInput
} from '@ionic/angular/standalone';
import { FirebaseServiceService, Ubicacion, Bodega } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.page.html',
  styleUrls: ['./agregar-ubicacion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonCardContent,
    IonCard,
    IonItem,
    IonList,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSelect,
    IonSelectOption
  ]
})
export class AgregarUbicacionPage implements OnInit {

  zona: string = '';
  estante: string = '';
  nivel: string = '';
  id_bodega: string = '';

  bodegas: Bodega[] = [];

  constructor(private fireService: FirebaseServiceService, private router: Router) { }

  ngOnInit() {
    this.fireService.getBodegas().subscribe(data => {
      this.bodegas = data;
    });
  }

  async crearUbicacion() {
    if (!this.zona || !this.estante || !this.nivel || !this.id_bodega) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const ubicacion: Ubicacion = {
      zona: this.zona.trim(),
      estante: this.estante.trim(),
      nivel: this.nivel.trim(),
      id_bodega: this.id_bodega
    };

    try {
      const ubicacionesRef = this.fireService.getUbicacionesCollection();
      await this.fireService.agregarDocumento(ubicacionesRef, ubicacion);
      alert('Ubicación creada exitosamente');
      this.router.navigate(['/ubicaciones']); // Ajusta esta ruta según tu flujo
    } catch (error) {
      console.error('Error al crear ubicación:', error);
      alert('Hubo un error al guardar la ubicación');
    }
  }

  cancelar() {
    this.router.navigate(['/ubicaciones']); // O cualquier página a la que quieras volver
  }

}
