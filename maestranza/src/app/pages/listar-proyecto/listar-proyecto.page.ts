import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonIcon, IonButtons, IonButton, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseServiceService, Proyectos } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.page.html',
  styleUrls: ['./listar-proyecto.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonButton, IonButtons, IonIcon, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarProyectoPage implements OnInit {
  
  proyectos: Proyectos[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fireService: FirebaseServiceService
  ) { 
    addIcons({ createOutline, trashOutline }); 
  }

  ngOnInit() {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.fireService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos = data;
        console.log('Proyectos cargados:', this.proyectos);
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        alert('Error al cargar la lista de proyectos');
      }
    });
  }

  editar(proyecto: Proyectos) {
    console.log('Editar proyecto:', proyecto);
    // Puedes pasar el id o datos al editar proyecto
    this.router.navigate(['/editar-proyecto', proyecto.id]);
  }

  agregarProyecto() {
    this.router.navigate(['/agregar-proyecto']);
  }

  async confirmarEliminar(proyecto: Proyectos) {
    const alert = await this.alertController.create({
      header: '¿Eliminar proyecto?',
      message: `¿Estás seguro que quieres eliminar el proyecto "${proyecto.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarProyecto(proyecto);
          }
        },
      ],
    });

    await alert.present();
  }

  eliminarProyecto(proyecto: Proyectos) {
    this.fireService.deleteProyecto(proyecto.id!).then(() => {
      alert('Proyecto eliminado');
      this.cargarProyectos(); // refrescar lista
    }).catch(error => {
      console.error('Error al eliminar proyecto:', error);
      alert('Error al eliminar el proyecto');
    });
  }
}
