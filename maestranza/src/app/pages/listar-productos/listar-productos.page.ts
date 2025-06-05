import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.page.html',
  styleUrls: ['./listar-productos.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,  IonSelect, IonSelectOption,]
})
export class ListarProductosPage implements OnInit {

  nombre : string = "";
  descripcion : string = "";
  ultimo_precio : number | null = null;
  codigo_barra : string = "";


  bodega_elegida :number | null = null;
  bodegas : any;

  constructor(private fireService : FirebaseServiceService, private router : Router) { }

 ngOnInit() {
  this.fireService.getBodegas().subscribe(data => {
    console.log("Bodegas recibidas:", data);  
    this.bodegas = data;
  });
}

  async agregarProducto() {
  // Validar que no estén vacíos
  if (!this.nombre || !this.descripcion || this.ultimo_precio == null || !this.codigo_barra || !this.bodega_elegida) {
    alert('Todos los campos son obligatorios');
    return;
  }

  // Validar longitud nombre
  if (this.nombre.trim().length < 3) {
    alert('El nombre del producto debe tener al menos 3 caracteres');
    return;
  }

  // Validar longitud descripción
  if (this.descripcion.trim().length < 5) {
    alert('La descripción debe tener al menos 5 caracteres');
    return;
  }

  // Validar precio positivo
  if (this.ultimo_precio <= 0) {
    alert('El precio debe ser un número positivo mayor a cero');
    return;
  }

  // Validar código de barra: solo números, longitud 8 a 13
  const codigoRegex = /^[0-9]{8,13}$/;
  if (!codigoRegex.test(this.codigo_barra)) {
    alert('El código de barra debe contener entre 8 y 13 dígitos y solo números');
    return;
  }

  const producto = {
    nombre: this.nombre.trim(),
    descripcion: this.descripcion.trim(),
    ultimo_precio: this.ultimo_precio,
    codigo_barra: this.codigo_barra.trim(),
    bodega_elegida: this.bodega_elegida
  };

  try {
    await this.fireService.agregarProducto(producto);
    alert('Producto agregado con éxito');
    this.router.navigate(['/vista-inventario']);
    this.limpiarFormulario();
  } catch (error) {
    console.error('Error al agregar producto:', error);
    alert('Hubo un error al guardar el producto');
  }
 }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/home']); // cambia según donde quieras volver
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.ultimo_precio = null;
    this.codigo_barra = '';
    this.bodega_elegida = null;
  }

}
