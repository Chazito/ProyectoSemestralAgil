import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.page.html',
  styleUrls: ['./agregar-proyecto.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar,
    IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class AgregarProyectoPage implements OnInit {

  nombre: string = '';
  fecha: string = '';
  empleados: string = '';
  materiales: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/listar-proyecto']); // cambia según donde quieras volver
  }

  limpiarFormulario() {
    this.nombre = '';
    this.fecha = '';
    this.empleados = '';
    this.materiales = '';
  }

  agregarProyecto() {
  // Validación: nombre requerido y mínimo 3 caracteres
  if (!this.nombre.trim()) {
    alert('Por favor ingresa el nombre del proyecto');
    return;
  }
  if (this.nombre.length < 3) {
    alert('El nombre del proyecto debe tener al menos 3 caracteres');
    return;
  }

  // Validación: fecha requerida y formato básico ISO (YYYY-MM-DD)
  if (!this.fecha || this.fecha.trim() === '') {
    alert('Por favor selecciona una fecha para el proyecto');
    return;
  }

  // Validación adicional: la fecha no debe ser inválida
  const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(this.fecha);
  if (!fechaValida) {
    alert('Formato de fecha inválido. Usa el formato AAAA-MM-DD');
    return;
  }

  // Validación: al menos un empleado debe ser seleccionado
  if (!this.empleados || this.empleados.length === 0) {
    alert('Debes seleccionar al menos un empleado para el proyecto');
    return;
  }

  // Validación: materiales no vacío
  if (!this.materiales.trim()) {
    alert('Por favor ingresa los materiales del proyecto');
    return;
  }

  // Si pasa todas las validaciones
  console.log('Proyecto agregado:', {
    nombre: this.nombre,
    fecha: this.fecha,
    empleados: this.empleados,
    materiales: this.materiales
  });

  alert('Proyecto agregado correctamente');
  this.limpiarFormulario();
  this.router.navigate(['/proyectos']); // Ajusta la ruta según corresponda
}

}
