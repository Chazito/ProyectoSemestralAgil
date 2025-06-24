import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonIcon, IonButtons, IonButton, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.page.html',
  styleUrls: ['./listar-proyecto.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonButton, IonButtons, IonIcon, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarProyectoPage implements OnInit {

  constructor(private router : Router, private alertController : AlertController) {
    addIcons({ createOutline, trashOutline }); }

  ngOnInit() {
  }

  editar() {
    console.log('Editar proyecto');
    this.router.navigate(['/editar-proyecto']);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  agregarProyecto(){
    this.router.navigate(['/agregar-proyecto'])
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
