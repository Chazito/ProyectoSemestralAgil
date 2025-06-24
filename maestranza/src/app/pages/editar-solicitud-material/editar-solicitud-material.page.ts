import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonItem, IonLabel, IonList, IonInput,
  IonAccordion, IonAccordionGroup, IonCheckbox, IonIcon } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FirebaseServiceService, SolicitudMateriales } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-editar-solicitud-material',
  templateUrl: './editar-solicitud-material.page.html',
  styleUrls: ['./editar-solicitud-material.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonInput,
    IonAccordion,
    IonAccordionGroup,
    IonCheckbox
  ]
})
export class EditarSolicitudMaterialPage implements OnInit {
  idSolicitud!: string;
  nombre: string = '';
  productos: any[] = [];
  productosFiltrados: any[] = [];
  user: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fireService: FirebaseServiceService
  ) {}

  ngOnInit() {
    // Carga usuario
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.nombre = this.user?.nombre || '';
    }
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.nombre = user?.nombre || '';
    });

    // Carga productos
    this.fireService.getProductos().subscribe(data => {
      this.productos = data;
      this.productosFiltrados = [...this.productos];
      this.loadSolicitud();
    });
  }

  loadSolicitud() {
    this.route.params.subscribe(params => {
      this.idSolicitud = params['id'];
      if (this.idSolicitud) {
        this.fireService.getSolicitudMaterialesById(this.idSolicitud).subscribe(data => {
          const solicitud = data as SolicitudMateriales;
          if (solicitud) {
            const nombresMateriales = solicitud.materiales;
            // Marca productos según solicitud
            this.productos.forEach(producto => {
              producto.seleccionado = nombresMateriales.includes(producto.nombre);
            });
          }
        });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/listar-solicitud-material']);
  }

  editarSolicitud() {
    const materialesSeleccionados = this.productos
      .filter(p => p.seleccionado)
      .map(p => p.nombre);

    if (materialesSeleccionados.length === 0) {
      alert('Por favor selecciona al menos un material');
      return;
    }

    const solicitudEditada: SolicitudMateriales = {
      nombre: this.nombre,
      materiales: materialesSeleccionados
    };
    this.fireService.updateSolicitudMateriales(this.idSolicitud, solicitudEditada)
      .then(() => {
        alert('Solicitud actualizada correctamente');
        this.router.navigate(['/listar-solicitud-material']);
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar la solicitud');
      });
  }
}
