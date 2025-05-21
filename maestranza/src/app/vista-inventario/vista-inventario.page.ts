import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonButton, IonIcon, IonButtons, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-vista-inventario',
  templateUrl: './vista-inventario.page.html',
  styleUrls: ['./vista-inventario.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonCol, IonRow, IonButtons, IonIcon, IonButton, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VistaInventarioPage implements OnInit {
  filtroTexto: string = '';

  productos = [
    {
      id: 1212,
      nombre: 'Taladro percutor',
      precio: 88990,
      stock: 3
    },
    {
      id: 1256,
      nombre: 'Set brocas',
      precio: 9990,
      stock: 10
    },
    {
      id: 4345,
      nombre: 'Martillo',
      precio: 6350,
      stock: 15
    },
    {
      id: 1345,
      nombre: 'Cemento Polpaico',
      precio: 4950,
      stock: 9
    }
  ];

  constructor() {}

  ngOnInit() {}

  editar(producto: any) {
    console.log('Editar producto', producto);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  eliminar(producto: any) {
    console.log('Eliminar producto', producto);
    // Aquí podrías mostrar una alerta de confirmación y eliminar el producto del array
  }
}  
