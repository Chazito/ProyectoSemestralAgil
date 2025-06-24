import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonCheckbox, IonAccordionGroup, IonAccordion, IonSearchbar, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FirebaseServiceService, SolicitudMateriales } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-agregar-solicitud-material',
  templateUrl: './agregar-solicitud-material.page.html',
  styleUrls: ['./agregar-solicitud-material.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonIcon, 
    IonSearchbar,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule
  ]
})
export class AgregarSolicitudMaterialPage implements OnInit {

  nombre: string = '';
  materiales: string = '';
  user: any = null;
  productos: any[] = [];
  productosFiltrados: any[] = [];  // <-- FILTRADOS

  constructor(private router: Router, private userService: UserService, private fireService: FirebaseServiceService) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.fireService.getProductos().subscribe(data => {
      this.productos = data;
      this.productosFiltrados = [...this.productos];  // Inicializa con todos los productos
    });
  }

  filtrarProductos(event: any) {
    const texto = event.target.value?.toLowerCase() || '';
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto)
    );
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-solicitud-material']);
  }

  limpiarFormulario() {
    this.nombre = '';
    this.materiales = '';
  }

agregarSolicitud() {
  // Validación del nombre del usuario logueado
  if (!this.user?.nombre || this.user.nombre.trim().length < 3) {
    alert('Error: El usuario logueado no tiene un nombre válido.');
    return;
  }

  // Validación de productos seleccionados
  const materialesSeleccionados = this.productos
    .filter(p => p.seleccionado)
    .map(p => p.nombre);

  if (materialesSeleccionados.length === 0) {
    alert('Por favor selecciona al menos un material');
    return;
  }

  // Crear el objeto para enviar a Firebase
  const nuevaSolicitud: SolicitudMateriales = {
    nombre: this.user.nombre,
    materiales: materialesSeleccionados
  };
  
  console.log('Solicitud agregada por:', this.user.nombre, nuevaSolicitud);

  // Guardar en Firebase
  this.fireService.agregarSolicitudMateriales(nuevaSolicitud)
    .then(() => {
      alert('Solicitud agregada correctamente');
      this.limpiarFormulario();
      this.router.navigate(['/listar-solicitud-material']);
    })
    .catch(error => {
      console.error('Error al agregar solicitud:', error);
      alert('Hubo un error al agregar la solicitud, intenta nuevamente.');
    });
}



}
