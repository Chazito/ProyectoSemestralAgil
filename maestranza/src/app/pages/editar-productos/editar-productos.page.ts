import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, ToastController, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.page.html',
  styleUrls: ['./editar-productos.page.scss'],
  standalone: true,
  imports: [IonInput, IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, IonSelectOption,]
})
export class EditarProductosPage implements OnInit {

  private firestore = inject(Firestore);
  codigo_barra : string = "";
  nombre : string = "";
  descripcion : string = "";
  ultimo_precio : string = "";
  bodega_elegida! : number ;

  bodegas : any;

  nueva_bodega_elegida : number= 0 ;

  private productoId : string = "";

  constructor(private route : ActivatedRoute, private router : Router, private toastController : ToastController, private fireService : FirebaseServiceService) { }

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
          this.bodega_elegida = producto['bodega_elegida'];
          this.nueva_bodega_elegida = producto['bodega_elegida'];

          //probaremos esto 
          console.log("Bodega elegida cargada:", this.bodega_elegida);
          console.log("Nueva bodega elegida inicializada:", this.nueva_bodega_elegida);
        }
      });
    }

    this.fireService.getBodegas().subscribe(data => {
      console.log("Bodegas recibidas:", data);  
      this.bodegas = data;
    });
  }
  async editarProducto() {
  if (!this.productoId) return;

  // Validar que no estén vacíos
  if (!this.nombre || !this.descripcion || this.ultimo_precio == null || !this.codigo_barra || !this.nueva_bodega_elegida) {
    this.showToast('Todos los campos son obligatorios.');
    return;
  }

  // Validar longitud del nombre
  if (this.nombre.trim().length < 3) {
    this.showToast('El nombre del producto debe tener al menos 3 caracteres.');
    return;
  }

  // Validar longitud de la descripción
  if (this.descripcion.trim().length < 5) {
    this.showToast('La descripción debe tener al menos 5 caracteres.');
    return;
  }

  // Validar precio positivo
  const precio = Number(this.ultimo_precio);
  if (isNaN(precio) || precio <= 0) {
    this.showToast('El precio debe ser un número positivo mayor a cero.');
    return;
  }

  // Validar código de barra: solo números, longitud 8 a 13
  const codigoRegex = /^[0-9]{8,13}$/;
  if (!codigoRegex.test(this.codigo_barra)) {
    this.showToast('El código de barra debe contener entre 8 y 13 dígitos y solo números.');
    return;
  }

  // Validar selección de bodega
  if (!this.nueva_bodega_elegida || this.nueva_bodega_elegida === 0) {
    this.showToast('Por favor selecciona una bodega válida.');
    return;
  }

  console.log("Guardando bodega elegida:", this.nueva_bodega_elegida);
  console.log("Tipo de nueva_bodega_elegida:", typeof this.nueva_bodega_elegida);

  const ref = doc(this.firestore, `productos/${this.productoId}`);
  await updateDoc(ref, {
    codigo_barra: this.codigo_barra,
    nombre: this.nombre,
    descripcion: this.descripcion,
    ultimo_precio: precio,
    bodega_elegida: this.nueva_bodega_elegida
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
