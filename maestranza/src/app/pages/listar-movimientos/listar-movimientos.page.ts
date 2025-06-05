import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseServiceService, Movimiento, Ubicacion, Producto, Usuario } from 'src/app/services/firebase-service.service';
import { Observable } from 'rxjs';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-movimientos',
  templateUrl: './listar-movimientos.page.html',
  styleUrls: ['./listar-movimientos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardContent, IonButtons, IonButton, IonIcon
  ]
})
export class ListarMovimientosPage implements OnInit {

  movimientos: Movimiento[] = [];
  productos: Producto[] = [];
  ubicaciones: Ubicacion[] = [];
  usuarios: Usuario[] = [];

  constructor(private fireService: FirebaseServiceService, private router: Router) { }

  ngOnInit() {
    this.fireService.getMovimientos().subscribe(data => this.movimientos = data);
    this.fireService.getProductos().subscribe(data => this.productos = data);
    this.fireService.getUbicaciones().subscribe(data => this.ubicaciones = data);
    this.fireService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  agregarMovimiento() {
    this.router.navigate(['/agregar-movimiento']); // Ajusta la ruta si es distinta
  }

  obtenerNombreProducto(codigo_barra: string): string {
    const prod = this.productos.find(p => p.codigo_barra === codigo_barra);
    return prod ? prod.nombre : 'Desconocido';
  }

  obtenerNombreUbicacion(id_ubicacion: string): string {
    const ub = this.ubicaciones.find(u => u.id === id_ubicacion);
    return ub ? `${ub.zona}-${ub.estante}-${ub.nivel}` : 'Desconocida';
  }

  obtenerEmailUsuario(id_usuario: string): string {
    const user = this.usuarios.find(u => u.id === id_usuario);
    return user ? user.email : 'Desconocido';
  }
}
