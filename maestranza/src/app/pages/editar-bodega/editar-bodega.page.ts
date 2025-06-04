import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, ToastController, IonGrid, IonCardContent, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-editar-bodega',
  templateUrl: './editar-bodega.page.html',
  styleUrls: ['./editar-bodega.page.scss'],
  standalone: true,
  imports: [IonButton, IonGrid, IonItem, IonLabel, IonList, IonCardContent, IonCard, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput]
})
export class EditarBodegaPage implements OnInit {

  private firestore = inject(Firestore);

  codigoBodega: string = "";
  nombreBodega: string = "";
  direccionBodega: string = "";
  capacidad: string = "";

  private bodegaId : string = "";

  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bodegaId = id;
      const ref = doc(this.firestore, `bodegas/${id}`);
      getDoc(ref).then(snapshot => {
        if (snapshot.exists()) {
          const bodega = snapshot.data();
          this.codigoBodega = bodega['codigoBodega'];
          this.nombreBodega = bodega['nombreBodega'];
          this.direccionBodega = bodega['direccionBodega'];
          this.capacidad = bodega['capacidad'];
        }
      });
    }
  }

editarBodega() {
  if (!this.bodegaId) return;


  // Validar campos vacíos
  if (!this.codigoBodega?.trim() || !this.nombreBodega?.trim() || !this.direccionBodega?.trim()) {
    this.showToast('Todos los campos son obligatorios');
    return;
  }

  // Validar longitud código
  if (this.codigoBodega.trim().length < 3) {
    this.showToast('El código de la bodega debe tener al menos 3 caracteres');
    return;
  }

  // Validar longitud nombre
  if (this.nombreBodega.trim().length < 8) {
    this.showToast('El nombre de la bodega debe tener al menos 8 caracteres');
    return;
  }

  // Validar longitud dirección
  if (this.direccionBodega.trim().length < 10) {
    this.showToast('La dirección de la bodega debe tener al menos 10 caracteres');
    return;
  }

  // Validar capacidad
  if (this.capacidad === null || this.capacidad === undefined || this.capacidad === '' || this.capacidad === '0') {
    this.showToast('La capacidad es obligatoria');
    return;
  }

  const capacidad = typeof this.capacidad === 'string' ? parseFloat(this.capacidad) : this.capacidad;

  if (isNaN(capacidad)) {
    this.showToast('La capacidad debe ser un número válido');
    return;
  }

  if (capacidad < 1) {
    this.showToast('La capacidad no puede ser menor a 1');
    return;
  }

  if (!Number.isInteger(capacidad)) {
    this.showToast('No se permiten decimales en la capacidad');
    return;
  }



  const ref = doc(this.firestore, `bodegas/${this.bodegaId}`);
  updateDoc(ref, {
    codigoBodega: this.codigoBodega,
    nombreBodega: this.nombreBodega,
    direccionBodega: this.direccionBodega,
    capacidad: this.capacidad,
  });

  this.showToast('Bodega actualizada correctamente.');
  this.router.navigate(['/listar-bodega']);
}

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  cancelar() {
    this.router.navigate(['/listar-bodega']);
  }
}
