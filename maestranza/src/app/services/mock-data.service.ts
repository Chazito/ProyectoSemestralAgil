import { Injectable } from '@angular/core';
import { FirebaseServiceService, Bodega, Producto, Ubicacion, Movimiento } from './firebase-service.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private firebaseService: FirebaseServiceService) { }

  async seedData(): Promise<void> {
    const bodegas: { id: string, nombreBodega: string }[] = [];
    const ubicaciones: { id: string, data: Ubicacion }[] = [];
    const productos: Producto[] = [];

    // 1. Crear 5 bodegas
    for (let i = 1; i <= 5; i++) {
      const bodega: Bodega = {
        nombreBodega: `Bodega ${i}`,
        direccionBodega: `Calle Falsa ${i * 100}`
      };
      await this.firebaseService.agregarBodega(bodega);
    }

    const allBodegas = await firstValueFrom(this.firebaseService.getBodegas());

    // 2. Crear 100 productos
    for (let i = 1; i <= 100; i++) {
      const producto: Producto = {
        nombre: `Producto ${i}`,
        descripcion: `Descripción del producto ${i}`,
        marca: `Marca ${i % 5}`,
        codigo_barra: `CB${1000 + i}`,
        ultima_compra_id: '',
        etiquetas: [`etiqueta${i % 3}`, `etiqueta${(i + 1) % 3}`]
      };
      await this.firebaseService.agregarProducto(producto);
      productos.push(producto);
    }

    // 3. Crear 10 ubicaciones por bodega
    for (const bodega of allBodegas) {
      for (let u = 1; u <= 10; u++) {
        const ubicacion: Ubicacion = {
          zona: `Z${u}`,
          estante: `E${u}`,
          nivel: `N${u}`,
          id_bodega: bodega.id
        };
        await this.firebaseService.agregarDocumento(this.firebaseService.getUbicacionesCollection(), ubicacion);
      }
    }

    const allUbicaciones = await firstValueFrom(this.firebaseService.getUbicaciones());

    // 4. Crear 30 movimientos por bodega
    for (const bodega of allBodegas) {
      const ubicacionesDeBodega = allUbicaciones.filter(u => u.id_bodega === bodega.id);
      for (let m = 0; m < 30; m++) {
        const producto = productos[Math.floor(Math.random() * productos.length)];
        const ubicacion = ubicacionesDeBodega[Math.floor(Math.random() * ubicacionesDeBodega.length)];

        if (!ubicacion?.id) continue;

        const movimiento: Movimiento = {
          codigo_barra: producto.codigo_barra,
          id_ubicacion: ubicacion.id,
          id_usuario: 'test-user',
          fecha: new Date(),
          cantidad: Math.floor(Math.random() * 20) + 1,
          accion: ['entrada', 'salida', 'uso', 'devolucion'][Math.floor(Math.random() * 4)],
          comentario: 'Movimiento de prueba'
        };

        await this.firebaseService.agregarMovimiento(movimiento);
      }
    }

    await this.firebaseService.presentAlert("Éxito", "Datos de prueba generados correctamente.");
  }
}
