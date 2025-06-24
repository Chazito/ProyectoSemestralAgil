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
  imports: [IonList, IonItem, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarProductosPage implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  ultimo_precio: number | null = null;
  codigo_barra: string = "";
  marca: string = "";
  etiquetas: string[] = [];
  etiquetas_input: string = "";


  constructor(private fireService: FirebaseServiceService, private router: Router) { }

  ngOnInit() {

  }

  async agregarProducto() {
    // Validar que no estén vacíos
    if (!this.nombre || !this.descripcion || this.ultimo_precio == null || !this.codigo_barra || !this.marca) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validar longitud nombre
    if (this.nombre.trim().length < 3 || this.nombre.trim().length > 60) {
      alert('El nombre del producto debe tener entre 3 a 60 caracteres');
      return;
    }

    // Validar longitud descripción
    if (this.descripcion.trim().length < 5 || this.descripcion.trim().length > 600) {
      alert('La descripción debe tener entre 5 y 600 caracteres');
      return;
    }

    if (this.marca.trim().length < 3 || this.marca.trim().length > 40) {
      alert('La marca debe tener entre 3 y 40 caracteres');
      return;
    }

    // Validar código de barra: solo números, longitud 8 a 13
    const codigoRegex = /^[0-9]{8,13}$/;
    if (!codigoRegex.test(this.codigo_barra)) {
      alert('El código de barra debe contener entre 8 y 13 dígitos y solo números');
      return;
    }

    const etiquetas = this.etiquetas_input
      .split(',')
      .map(et => et.trim().toLowerCase())
      .filter(et => et.length > 0);

    const producto = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      codigo_barra: this.codigo_barra.trim(),
      marca: this.marca.trim(),
      ultima_compra_id: "",
      etiquetas: etiquetas
    };


    try {
      await this.fireService.agregarProducto(producto);
      alert('Producto agregado con éxito');
      this.router.navigate(['/inventario']);
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
    this.etiquetas_input = '';
  }

}
