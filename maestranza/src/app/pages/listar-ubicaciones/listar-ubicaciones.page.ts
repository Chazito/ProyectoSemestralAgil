import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardContent, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirebaseServiceService, Ubicacion, Bodega } from 'src/app/services/firebase-service.service';


@Component({
  selector: 'app-listar-ubicaciones',
  templateUrl: './listar-ubicaciones.page.html',
  styleUrls: ['./listar-ubicaciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonCard, IonCardContent, IonButtons]
})
export class ListarUbicacionesPage implements OnInit {

  ubicaciones: Ubicacion[] = [];
  bodegas: Bodega[] = [];

  constructor(
    private fireService: FirebaseServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fireService.getBodegas().subscribe(b => this.bodegas = b);
    this.fireService.getUbicaciones().subscribe(u => this.ubicaciones = u);
  }

  obtenerNombreBodega(id_bodega: string): string {
    const bodega = this.bodegas.find(b => b.id === id_bodega);
    return bodega ? bodega.nombreBodega : 'Desconocida';
  }

  agregarUbicacion() {
    this.router.navigate(['/agregar-ubicacion']);
  }

  editar(ubicacion: Ubicacion) {
    this.router.navigate(['/editar-ubicacion', ubicacion.id]);
  }

  async eliminar(ubicacion: Ubicacion) {
    const confirmado = confirm(`¿Eliminar ubicación en zona ${ubicacion.zona}?`);
    if (confirmado && ubicacion.id) {
      await this.fireService.deleteUbicacion(ubicacion.id);
    }
  }

}
