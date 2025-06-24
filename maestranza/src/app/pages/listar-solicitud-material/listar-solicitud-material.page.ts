import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonButton, IonButtons, IonIcon, AlertController
} from '@ionic/angular/standalone';
import { createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { FirebaseServiceService, SolicitudMateriales } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-listar-solicitud-material',
  templateUrl: './listar-solicitud-material.page.html',
  styleUrls: ['./listar-solicitud-material.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardContent, IonButton, IonButtons, IonIcon,
    CommonModule, FormsModule
  ]
})
export class ListarSolicitudMaterialPage implements OnInit {

  solicitudes: SolicitudMateriales[] = []; // Ahora viene de Firebase

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fireService: FirebaseServiceService
  ) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.fireService.getSolicitudMateriales().subscribe(data => {
      this.solicitudes = data;
    });
  }

  editar() {
    console.log('Editar solicitud');
    this.router.navigate(['/editar-solicitud-material']);
  }

  agregarSolicitud() {
    this.router.navigate(['/agregar-solicitud-material']);
  }

  async confirmarEliminar(solicitud: SolicitudMateriales) {
    const alert = await this.alertController.create({
      header: '¿Eliminar solicitud?',
      message: `¿Estás seguro que quieres eliminar la solicitud de ${solicitud.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.fireService.deleteSolicitudMateriales(solicitud.id!);
            this.cargarSolicitudes();
          },
        },
      ],
    });
    await alert.present();
  }
}
