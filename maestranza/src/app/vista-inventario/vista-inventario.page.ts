import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonButton, IonIcon, IonButtons, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { FirebaseServiceService, Producto } from '../services/firebase-service.service';
import {AlertController} from '@ionic/angular';
import { logOutOutline, addCircleOutline, trashOutline, create, createOutline, closeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-inventario',
  templateUrl: './vista-inventario.page.html',
  styleUrls: ['./vista-inventario.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonButtons, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VistaInventarioPage implements OnInit {
  filtroTexto: string = '';

  productos : Producto[] = [];

  constructor(private fireService : FirebaseServiceService, private alertController : AlertController, private router : Router) {
    addIcons({createOutline,closeCircleOutline,addCircleOutline,trashOutline,create,logOutOutline});
    this.fireService.getProductos().subscribe(
      data =>{
        this.productos = data;
      }
    );
  }

  ngOnInit() {}

  editar(producto: any) {
    console.log('Editar producto', producto);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  async confirmarEliminar(producto: any) {
    const alert = await this.alertController.create({
      header: '¿Eliminar producto?',
      message: `¿Estás seguro que quieres eliminar <strong>${producto.nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminar(producto),
        },
      ],
    });

    await alert.present();
  }

  eliminar(producto: any) {
    console.log('Eliminar producto', producto);
    this.fireService.deleteProducto(producto.id);
    // Aquí podrías mostrar una alerta de confirmación y eliminar el producto del array
  }

  agregarProducto(){
    this.router.navigate(['/listar-productos'])
  }
}  
