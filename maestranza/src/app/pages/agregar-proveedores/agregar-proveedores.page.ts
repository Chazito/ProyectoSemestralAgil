import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-agregar-proveedores',
  templateUrl: './agregar-proveedores.page.html',
  styleUrls: ['./agregar-proveedores.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonLabel, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect,
    IonSelectOption, CommonModule, FormsModule]
})
export class AgregarProveedoresPage implements OnInit {

  private firestore = inject(FirebaseServiceService);

  rut: string = '';
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  direccion: string = '';
  terminosPago: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/proveedores']); // cambia según donde quieras volver
  }

  limpiarFormulario() {
    this.rut = '';
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.direccion = '';
    this.terminosPago = '';
  }

  async agregarProveedor() {
    // Validación de campos vacíos
    if (!this.rut.trim() || !this.nombre.trim() || !this.correo.trim() ||
      !this.telefono.trim() || !this.direccion.trim() || !this.terminosPago.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validación RUT: solo números, y opcionalmente una 'k' al final, sin puntos ni guiones
    const rutRegex = /^[0-9]{6,9}[kK]?$/;
    if (!rutRegex.test(this.rut) || this.rut.length < 7 || this.rut.length > 10) {
      alert('El RUT debe tener entre 7 y 10 caracteres, solo números y una letra K opcional al final, sin puntos ni guiones');
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

    const proveedor = {
      rut: this.rut,
      nombre: this.nombre,
      correo: this.correo,
      telefono: Number(this.telefono),
      direccion: this.direccion,
      terminos_pago: this.terminosPago
    };

    await this.firestore.agregarProveedor(proveedor)
    // Si pasa todas las validaciones
    console.log('Proveedor agregado:', proveedor);

    alert('Proveedor agregado correctamente');
    this.limpiarFormulario();
    this.router.navigate(['/proveedores']);
  }


}
