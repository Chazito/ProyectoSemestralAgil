import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonList, IonLabel, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.page.html',
  styleUrls: ['./editar-proyecto.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class EditarProyectoPage implements OnInit {

  nombre: string = '';
  fecha: string = '';
  empleados: string[] = [];
  materiales: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-proyecto']); // Ruta a donde quieras volver
  }

  limpiarFormulario() {
    this.nombre = '';
    this.fecha = '';
    this.empleados = [];
    this.materiales = '';
  }

  editarProyecto() {
    // Aquí puedes replicar las validaciones del agregarProyecto

    if (!this.nombre.trim()) {
      alert('Por favor ingresa el nombre del proyecto');
      return;
    }
    if (this.nombre.length < 3) {
      alert('El nombre del proyecto debe tener al menos 3 caracteres');
      return;
    }

    if (!this.fecha || this.fecha.trim() === '') {
      alert('Por favor selecciona una fecha para el proyecto');
      return;
    }

    const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(this.fecha);
    if (!fechaValida) {
      alert('Formato de fecha inválido. Usa el formato AAAA-MM-DD');
      return;
    }

    if (!this.empleados || this.empleados.length === 0) {
      alert('Debes seleccionar al menos un empleado para el proyecto');
      return;
    }

    if (!this.materiales.trim()) {
      alert('Por favor ingresa los materiales del proyecto');
      return;
    }

    // Aquí puedes llamar a tu servicio para guardar los cambios o actualizar tu modelo

    console.log('Proyecto editado:', {
      nombre: this.nombre,
      fecha: this.fecha,
      empleados: this.empleados,
      materiales: this.materiales
    });

    alert('Proyecto editado correctamente');
    this.limpiarFormulario();
    this.router.navigate(['/listar-proyecto']); // Ajusta según tu flujo
  }
}

