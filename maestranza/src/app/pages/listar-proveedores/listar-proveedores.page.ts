import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonIcon, IonButtons,IonButton, IonCardContent } from '@ionic/angular/standalone';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, addCircleOutline } from 'ionicons/icons';
import { FirebaseServiceService, Proveedor } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-listar-proveedores',
  templateUrl: './listar-proveedores.page.html',
  styleUrls: ['./listar-proveedores.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButton,IonButtons, IonIcon, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarProveedoresPage implements OnInit {

  proveedores : Proveedor[] = [];
  private firebase : FirebaseServiceService = inject(FirebaseServiceService);

  constructor(private router : Router, private alertController : AlertController) { 
    addIcons({addCircleOutline,createOutline,trashOutline});
  }

  ngOnInit() {
    this.firebase.getProveedores().subscribe( b => this.proveedores = b);
  }

  editar() {
    console.log('Editar producto');
    this.router.navigate(['/editar-proveedores']);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  agregarProveedor(){
    this.router.navigate(['/agregar-proveedores'])
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
