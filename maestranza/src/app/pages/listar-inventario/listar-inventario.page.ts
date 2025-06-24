import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonCard, IonCardContent, IonList,
  IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { Bodega, FirebaseServiceService, Producto } from 'src/app/services/firebase-service.service';
import { collection } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.page.html',
  styleUrls: ['./listar-inventario.page.scss'],
  standalone: true,
  imports: [IonIcon,
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonSelect, IonSelectOption,
    IonCard, IonCardContent, IonInput, IonButton
  ]
})
export class ListarInventarioPage implements OnInit {

  bodegas: Bodega[] = [];
  bodegaSeleccionada: string = '';
  productosInventario: any[] = [];
  todosLosProductos: Producto[] = [];

  constructor(private fireService: FirebaseServiceService) {
    addIcons({ saveOutline });
  }

  ngOnInit() {
    this.fireService.getBodegas().subscribe(b => this.bodegas = b);
    this.fireService.getProductos().subscribe(p => this.todosLosProductos = p);
  }

  async cargarInventario() {
    if (!this.bodegaSeleccionada) return;

    this.productosInventario = [];

    const productosRef = collection(this.fireService.firestore,
      `inventario/${this.bodegaSeleccionada}/productos`);
    const productosSnap = await getDocs(productosRef);

    for (const productoDoc of productosSnap.docs) {
      const codigo_barra = productoDoc.id;
      const data = productoDoc.data();
      const total = data['total'] || 0;
      const stock_min = data['stock_min'] || 0;

      const producto = this.todosLosProductos.find(p => p.codigo_barra === codigo_barra);
      this.productosInventario.push({
        codigo_barra,
        nombre: producto?.nombre || 'Desconocido',
        total,
        stock_min
      });
    }
  }

  async guardarStockMinimo(p: any) {
    const path = `inventario/${this.bodegaSeleccionada}/productos/${p.codigo_barra}`;
    try {
      await this.fireService.updateDoc(path, { stock_min: p.stock_min });
      await this.fireService.presentAlert('Éxito', `Stock mínimo actualizado para ${p.nombre}`);
    } catch (error) {
      console.error(error);
      await this.fireService.presentAlert('Error', 'No se pudo actualizar el stock mínimo');
    }
  }
}
