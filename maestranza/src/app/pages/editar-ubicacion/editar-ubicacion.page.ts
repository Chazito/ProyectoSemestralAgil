import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList,
  IonItem, IonButton, IonSelect, IonSelectOption, IonCard, IonCardContent, IonInput
} from '@ionic/angular/standalone';
import { FirebaseServiceService, Ubicacion, Bodega } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-editar-ubicacion',
  templateUrl: './editar-ubicacion.page.html',
  styleUrls: ['./editar-ubicacion.page.scss'],
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
  ],
})
export class EditarUbicacionPage implements OnInit {

  id: string = '';
  zona: string = '';
  estante: string = '';
  nivel: string = '';
  id_bodega: string = '';

  bodegas: Bodega[] = [];

  constructor(
    private route: ActivatedRoute,
    private fireService: FirebaseServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.fireService.getBodegas().subscribe(data => {
      this.bodegas = data;
    });

    if (this.id) {
      this.fireService.getUbicacionById(this.id).subscribe((ubicacion: Ubicacion) => {
        this.zona = ubicacion.zona;
        this.estante = ubicacion.estante;
        this.nivel = ubicacion.nivel;
        this.id_bodega = ubicacion.id_bodega;
      });
    }
  }

  async actualizarUbicacion() {
    if (!this.zona || !this.estante || !this.nivel || !this.id_bodega) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const data: Ubicacion = {
      zona: this.zona.trim(),
      estante: this.estante.trim(),
      nivel: this.nivel.trim(),
      id_bodega: this.id_bodega
    };

    try {
      await this.fireService.updateUbicacion(this.id, data);
      alert('Ubicación actualizada correctamente');
      this.router.navigate(['/ubicaciones']);
    } catch (error) {
      console.error('Error al actualizar ubicación:', error);
      alert('Ocurrió un error al actualizar');
    }
  }

  cancelar() {
    this.router.navigate(['/ubicaciones']);
  }
}
