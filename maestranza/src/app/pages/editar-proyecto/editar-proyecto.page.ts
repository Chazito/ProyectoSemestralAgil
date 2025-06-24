import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonList, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.page.html',
  styleUrls: ['./editar-proyecto.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, 
    IonSelect,IonSelectOption, CommonModule, FormsModule]
})
export class EditarProyectoPage implements OnInit {

  nombre: string = '';
  fecha: string = '';
  empleados: string = '';
  materiales: string = '';
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/agregar-proyecto']); // cambia según donde quieras volver
  }
}
