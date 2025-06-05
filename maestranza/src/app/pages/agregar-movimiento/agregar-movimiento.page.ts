import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
  IonItem, IonLabel, IonInput, IonButton, IonList, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {
  FirebaseServiceService, Movimiento, Producto, Ubicacion, Usuario
} from 'src/app/services/firebase-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agregar-movimiento',
  templateUrl: './agregar-movimiento.page.html',
  styleUrls: ['./agregar-movimiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton, IonList, IonSelect, IonSelectOption
  ],
})
export class AgregarMovimientoPage implements OnInit {

  codigo_barra: string = '';
  id_ubicacion: string = '';
  accion: string = '';
  cantidad: number = 0;
  comentario: string = '';

  productos: Producto[] = [];
  ubicaciones: Ubicacion[] = [];

  constructor(
    private fireService: FirebaseServiceService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fireService.getProductos().subscribe(data => this.productos = data);
    this.fireService.getUbicaciones().subscribe(data => this.ubicaciones = data);
  }

  async guardarMovimiento() {
    if (!this.codigo_barra || !this.id_ubicacion || !this.accion || this.cantidad <= 0) {
      alert('Todos los campos son obligatorios y la cantidad debe ser mayor a 0');
      return;
    }

    const usuario = this.userService.getUser();
    if (!usuario || !usuario.email) {
      alert('No hay usuario autenticado');
      return;
    }

    const movimiento: Movimiento = {
      codigo_barra: this.codigo_barra,
      id_ubicacion: this.id_ubicacion,
      id_usuario: usuario.id ?? usuario.email,
      fecha: new Date(),
      cantidad: this.cantidad,
      accion: this.accion,
      comentario: this.comentario.trim()
    };

    const salida = ["salida", "uso", "traslado"];
    if (salida.includes(movimiento.accion.toLowerCase())) {
      if (!await this.fireService.verificarCantidadDisponible(movimiento.codigo_barra, movimiento.id_ubicacion, movimiento.cantidad)) {
        alert("No se puede realizar este movimiento. La cantidad supera el inventario actual");
        return;
      }
    }

    try {
      await this.fireService.agregarMovimiento(movimiento);
      alert('Movimiento registrado con éxito');
      this.router.navigate(['/movimientos']);
    } catch (error) {
      console.error('Error al guardar movimiento:', error);
      alert('Error al guardar movimiento');
    }

    this.codigo_barra = "";
    this.id_ubicacion = "";
    this.accion = "";
    this.cantidad = 0;
    this.comentario = "";
  }

  cancelar() {
    this.codigo_barra = "";
    this.id_ubicacion = "";
    this.accion = "";
    this.cantidad = 0;
    this.comentario = "";
    this.router.navigate(['/movimientos']);
  }
}
