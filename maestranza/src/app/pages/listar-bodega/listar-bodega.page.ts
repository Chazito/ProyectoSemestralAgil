import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-bodega',
  templateUrl: './listar-bodega.page.html',
  styleUrls: ['./listar-bodega.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarBodegaPage implements OnInit {
bodegas : any[] = [];

  constructor( private fireService : FirebaseServiceService, private router : Router) { }

  ngOnInit() {
    this.fireService.getBodegas().subscribe(
      data =>{
        this.bodegas = data;
      }
    );
  }

  editar(bodega: any) {
    console.log('Editar bodega', bodega.id);
    this.router.navigate(['/editar-bodega', bodega.id]);
    // Aquí podrías redirigir a otra página o abrir un modal
  }

  eliminar(bodega: any) {
    this.fireService.presentAlert('Exito', 'Bodega eliminada con éxito');
    this.fireService.deleteBodega(bodega.id);
  }
  agregarBodega(){
  this.router.navigate(['/agregar-bodega'])
  }

}
