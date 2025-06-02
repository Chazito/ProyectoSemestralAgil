import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proveedores',
  templateUrl: './agregar-proveedores.page.html',
  styleUrls: ['./agregar-proveedores.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, 
    IonSelectOption, CommonModule, FormsModule]
})
export class AgregarProveedoresPage implements OnInit {

  rut: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  terminosPago: string = '';

  constructor(private router : Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-proveedores']); // cambia según donde quieras volver
  }

  limpiarFormulario() {
    this.rut = '';
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.direccion = '';
    this.terminosPago = '';
  }

  agregarProveedor() {
  // Validación de campos vacíos
  if (!this.rut.trim() || !this.nombre.trim() || !this.correo.trim() ||
      !this.telefono.trim() || !this.direccion.trim() || !this.terminosPago.trim()) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Validación RUT (solo números + letra opcional al final, sin puntos ni guiones, entre 7 y 10 caracteres)
  const rutRegex = /^[0-9]{6,9}[a-zA-Z]?$/;
  if (!rutRegex.test(this.rut) || this.rut.length < 7 || this.rut.length > 10) {
    alert('El RUT debe tener entre 7 y 10 caracteres, solo números y una letra opcional al final, sin puntos ni guiones');
    return;
  }

  // Validación nombre (mínimo 3 caracteres)
  if (this.nombre.length < 3) {
    alert('El nombre debe tener al menos 3 caracteres');
    return;
  }

  // Validación correo (formato y longitud)
  if (!/\S+@\S+\.\S+/.test(this.correo)) {
    alert('Formato de correo inválido. Ejemplo: matias@gmail.com');
    return;
  }
  if (this.correo.length < 6 || this.correo.length > 50) {
    alert('El correo debe tener entre 6 y 50 caracteres');
    return;
  }

  // Validación teléfono: solo números o + al inicio, longitud entre 9 y 12
  if (!/^(\+)?[0-9]+$/.test(this.telefono) || this.telefono.length < 9 || this.telefono.length > 12) {
    alert('El número de contacto debe tener entre 9 y 12 dígitos y solo contener números o un + al inicio, sin usar espacios');
    return;
  }

  // Validación dirección
  if (this.direccion.length < 5 || this.direccion.length > 100) {
    alert('La dirección debe tener entre 5 y 100 caracteres');
    return;
  }

  // Si pasa todas las validaciones
  console.log('Proveedor agregado:', {
    rut: this.rut,
    nombre: this.nombre,
    correo: this.correo,
    telefono: this.telefono,
    direccion: this.direccion,
    terminosPago: this.terminosPago
  });

  alert('Proveedor agregado correctamente');
  this.limpiarFormulario();
  }


}
