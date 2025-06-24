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

  solicitudes = [
    { nombre: 'Carlos Rojas', materiales: 'Madera, Clavos' },
    { nombre: 'Ana Pérez', materiales: 'Tornillos, Pintura' },
    { nombre: 'Luis Ramírez', materiales: 'Cemento, Arena' }
  ];

  constructor(private router : Router, private alertController: AlertController) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {

  }

  editar() {
    console.log('Editar proyecto');
    this.router.navigate(['/editar-proyecto']);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  agregarSolicitud(){
    this.router.navigate(['/agregar-solicitud-material'])
  }

  async confirmarEliminar() {
    const alert = await this.alertController.create({
      header: '¿Eliminar producto?',
      message: `¿Estás seguro que quieres eliminar esto?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
        },
      ],
    });

    await alert.present();
  }
}

