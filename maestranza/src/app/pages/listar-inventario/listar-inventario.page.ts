import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonSelectOption, IonText, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.page.html',
  styleUrls: ['./listar-inventario.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonText, IonButton, IonCol, IonRow, IonGrid, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelectOption]
})
export class ListarInventarioPage implements OnInit {

  bodegas: any[] = [];
  bodegaSeleccionada: string = '';
  inventario: any[] = [];

  constructor(private firebaseService: FirebaseServiceService) { }

  ngOnInit() {
    this.firebaseService.getBodegas().subscribe(bodegas => {
      this.bodegas = bodegas;
    });
  }

  cargarInventario() {
    if (!this.bodegaSeleccionada) {
      this.inventario = [];
      return;
    }

    const path = `inventario/${this.bodegaSeleccionada}/productos`;
    const productosRef = this.firebaseService.getProductos();

    productosRef.subscribe(productos => {
      const promises = productos.map(async (producto) => {
        const docSnap = await this.firebaseService.getProductoById(producto.id).toPromise();
        const invDoc = await this.firebaseService.obtenerDocumento(`inventario/${this.bodegaSeleccionada}/productos/${producto.codigo_barra}`);

        if (invDoc && invDoc.exists()) {
          const data = invDoc.data();
          return {
            ...producto,
            total: data['total'] || 0,
            stock_min: data['stock_min'] || 0
          };
        }

        return null;
      });

      Promise.all(promises).then(result => {
        this.inventario = result.filter(p => p !== null);
      });
    });
  }

  guardarStockMinimo(producto: any) {
    const path = `inventario/${this.bodegaSeleccionada}/productos/${producto.codigo_barra}`;
    this.firebaseService.updateDoc(path, { stock_min: producto.stock_min })
      .then(() => {
        this.firebaseService.presentAlert("Éxito", "Stock mínimo actualizado");
      })
      .catch(() => {
        this.firebaseService.presentAlert("Error", "No se pudo actualizar");
      });
  }

}
