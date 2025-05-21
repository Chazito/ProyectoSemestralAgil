import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.page.html',
  styleUrls: ['./listar-productos.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarProductosPage implements OnInit {

  nombre : string = "";
  descripcion : string = "";
  ultimo_precio : number | null = null;
  codigo_barra : string = "";

  constructor(private fireService : FirebaseServiceService, private router : Router) { }

  ngOnInit() {
  }

  async agregarProducto() {
    if (!this.nombre || !this.descripcion || this.ultimo_precio == null || !this.codigo_barra) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      ultimo_precio: this.ultimo_precio,
      codigo_barra: this.codigo_barra
    };

    try {
      await this.fireService.agregarProducto(producto);
      alert('Producto agregado con éxito');
      this.router.navigate(['/vista-inventario']); // o cualquier otra ruta
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Hubo un error al guardar el producto');
    }
  }

  cancelar() {
    this.router.navigate(['/home']); // cambia según donde quieras volver
  }

}
