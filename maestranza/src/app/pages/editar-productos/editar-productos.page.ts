import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, ToastController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.page.html',
  styleUrls: ['./editar-productos.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarProductosPage implements OnInit {

  private firestore = inject(Firestore);
  codigo_barra : string = "";
  nombre : string = "";
  descripcion : string = "";
  ultimo_precio : string = "";

  private productoId : string = "";

  constructor(private route : ActivatedRoute, private router : Router, private toastController : ToastController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.productoId = id;
      const ref = doc(this.firestore, `productos/${id}`);
      getDoc(ref).then(snapshot => {
        if (snapshot.exists()) {
          const producto = snapshot.data();
          // populate form with `producto`
          this.codigo_barra = producto['codigo_barra'];
          this.nombre = producto['nombre'];
          this.descripcion = producto['descripcion'];
          this.ultimo_precio = producto['ultimo_precio'];
        }
      });
    }
  }
  async editarProducto() {
    if (!this.productoId) return;

    const ref = doc(this.firestore, `productos/${this.productoId}`);
    await updateDoc(ref, {
      codigo_barra: this.codigo_barra,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ultimo_precio: Number(this.ultimo_precio),
    });

    this.showToast('Producto actualizado correctamente.');
    this.router.navigate(['/vista-inventario']);
  }

  cancelar() {
    this.router.navigate(['/vista-inventario']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
