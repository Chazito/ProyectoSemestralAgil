import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, getDoc, getDocs, increment, orderBy, query, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { combineLatest, firstValueFrom, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  private collectionUsuarios = "usuarios";
  private collectionProductos = "productos";
  private collectionBodegas = "bodegas";
  private collectionProveedores = "proveedores";

  constructor(public firestore: Firestore, private alertController: AlertController) { }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  //#region Usuario
  getUsuarios(): Observable<any[]> {
    const userCollection = collection(this.firestore, this.collectionUsuarios);
    return collectionData(userCollection, { idField: "id" });
  }

  getUsuarioByEmail(email: string): Observable<any> {
    const usuario = doc(this.firestore, `${this.collectionUsuarios}/${email}`);
    return docData(usuario, { idField: 'id' });
  }

  async datosValidos(email: string, password: string): Promise<boolean> {
    const usuario = doc(this.firestore, `${this.collectionUsuarios}/${email}`);
    const docSnap = await getDoc(usuario);
    if (!docSnap.exists()) {
      console.log("User doesn't exists")
      return false;
    }

    const data = docSnap.data();
    return data['contrasena'] == password;
  }
  //#endregion

  //#region Producto
  async agregarProducto(data: Producto): Promise<void> {
    const productCollection = collection(this.firestore, this.collectionProductos);
    await addDoc(productCollection, data);
  }

  getProductos(): Observable<any[]> {
    const productCollection = collection(this.firestore, this.collectionProductos);
    return collectionData(productCollection, { idField: "id" });
  }

  getProductoById(id: string): Observable<any> {
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    return docData(producto, { idField: 'id' });
  }

  async updateProducto(id: string, data: any): Promise<void> {
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    await updateDoc(producto, data);
  }

  async deleteProducto(id: string): Promise<void> {
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    await deleteDoc(producto);
  }

  buscarProductosPorPalabraClave(palabra: string): Observable<Producto[]> {
    const productosRef = collection(this.firestore, this.collectionProductos);

    const qNombre = query(productosRef,
      where('nombre', '>=', palabra),
      where('nombre', '<=', palabra + '\uf8ff')
    );

    const qEtiqueta = query(productosRef,
      where('etiquetas', 'array-contains', palabra.toLowerCase())
    );

    return combineLatest([
      collectionData(qNombre, { idField: 'id' }),
      collectionData(qEtiqueta, { idField: 'id' })
    ]).pipe(
      map(([porNombre, porEtiqueta]) => {
        const todos = [...porNombre, ...porEtiqueta];
        // Elimina duplicados por ID
        const unicos = Array.from(new Map(todos.map(p => [p['id'], p])).values());
        return unicos as Producto[];
      })
    );
  }
  //#endregion

  //#region Bodega
  //para las bodegas 
  async agregarBodega(data: Bodega): Promise<void> {
    const bodegaCollection = collection(this.firestore, this.collectionBodegas);
    await addDoc(bodegaCollection, data);
  }

  getBodegas(): Observable<any[]> {
    const bodegaCollection = collection(this.firestore, this.collectionBodegas);
    return collectionData(bodegaCollection, { idField: "id" });
  }

  getBodegaById(id: string): Observable<any> {
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    return docData(bodega, { idField: 'id' });
  }

  async updateBodega(id: string, data: any): Promise<void> {
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    await updateDoc(bodega, data);
  }

  async deleteBodega(id: string): Promise<void> {
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    await deleteDoc(bodega);
  }
  //#endregion

  //#region Ubicacion
  private collectionUbicaciones = "ubicaciones";

  getUbicacionesCollection() {
    return collection(this.firestore, this.collectionUbicaciones);
  }

  async agregarDocumento(ref: CollectionReference, data: any): Promise<void> {
    await addDoc(ref, data);
  }

  getUbicaciones(): Observable<Ubicacion[]> {
    const ubicacionesRef = collection(this.firestore, this.collectionUbicaciones);
    return collectionData(ubicacionesRef, { idField: 'id' }) as Observable<Ubicacion[]>;
  }

  async deleteUbicacion(id: string): Promise<void> {
    const ubicacionRef = doc(this.firestore, `${this.collectionUbicaciones}/${id}`);
    await deleteDoc(ubicacionRef);
  }

  getUbicacionById(id: string): Observable<Ubicacion> {
    const ref = doc(this.firestore, `ubicaciones/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Ubicacion>;
  }

  async updateUbicacion(id: string, data: any): Promise<void> {
    const ref = doc(this.firestore, `ubicaciones/${id}`);
    await updateDoc(ref, data);
  }
  //#endregion

  //#region Proveedor
  async agregarProveedor(proveedor: Proveedor): Promise<void> {
    const proveedorCollection = collection(this.firestore, this.collectionProveedores);
    await addDoc(proveedorCollection, proveedor);
  }

  async updateProveedor(id: string, data: any): Promise<void> {
    const proveedor = doc(this.firestore, `${this.collectionProveedores}/${id}`);
    await updateDoc(proveedor, data);
  }

  async deleteProveedor(id: string): Promise<void> {
    const proveedor = doc(this.firestore, `${this.collectionProveedores}/${id}`);
    await deleteDoc(proveedor);
  }

  getProveedores(): Observable<any[]> {
    const proveedorCollection = collection(this.firestore, this.collectionProveedores);
    return collectionData(proveedorCollection,)
  }

  getProveedorById(id: string): Observable<any> {
    const proveedor = doc(this.firestore, `${this.collectionProveedores}/${id}`);
    return docData(proveedor, { idField: 'id' });
  }
  //#endregion

  //#region Movimiento
  getMovimientosPorProducto(codigo_barra: string): Observable<Movimiento[]> {
    const movimientosRef = collection(this.firestore, 'movimientos');
    const q = query(movimientosRef,
      where('codigo_barra', '==', codigo_barra),
      orderBy('fecha', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Movimiento[]>;
  }
  getMovimientos(): Observable<Movimiento[]> {
    const movimientosRef = collection(this.firestore, 'movimientos');
    return collectionData(movimientosRef, { idField: 'id' }) as Observable<Movimiento[]>;
  }
  async agregarMovimiento(movimiento: Movimiento): Promise<void> {
    //Agregar a base de datos
    const movimientosRef = collection(this.firestore, 'movimientos');
    await addDoc(movimientosRef, movimiento);

    //Actualizar inventario
    const entrada = ["entrada", "devolucion"];
    const salida = ["salida", "uso", "traslado"];

    const cantidadAjuste = entrada.includes(movimiento.accion.toLowerCase())
      ? movimiento.cantidad
      : salida.includes(movimiento.accion.toLowerCase())
        ? -movimiento.cantidad
        : 0;

    const { codigo_barra, id_ubicacion } = movimiento;

    const ubicacionDoc = doc(this.firestore, `ubicaciones/${id_ubicacion}`);
    const ubicacionSnap = await getDoc(ubicacionDoc);

    if (!ubicacionSnap.exists()) {
      throw new Error('Ubicación no encontrada');
    }

    const id_bodega = ubicacionSnap.data()['id_bodega'];

    const inventarioUbicacionRef = doc(
      this.firestore,
      `inventario/${id_bodega}/productos/${codigo_barra}/ubicaciones/${id_ubicacion}`
    );
    const inventarioProductoRef = doc(this.firestore,
      `inventario/${id_bodega}/productos/${codigo_barra}`
    );
    const inventarioProductoSnap = await getDoc(inventarioProductoRef);
    const inventarioSnap = await getDoc(inventarioUbicacionRef);
    if (inventarioProductoSnap.exists()) {
      await updateDoc(inventarioProductoRef, {
        total: increment(cantidadAjuste),
        stock_min: 0
      });
    }
    else {
      await setDoc(inventarioProductoRef, {
        total: cantidadAjuste,
        stock_min: 0
      });
    }

    if (inventarioSnap.exists()) {
      const currentCantidad = inventarioSnap.data()['cantidad'] || 0;
      const nuevaCantidad = currentCantidad + cantidadAjuste;

      if (nuevaCantidad <= 0) {
        await deleteDoc(inventarioUbicacionRef);
      } else {
        await updateDoc(inventarioUbicacionRef, {
          cantidad: nuevaCantidad
        });
      }
    } else {
      // Only create the doc if the quantity is positive
      if (cantidadAjuste > 0) {
        await setDoc(inventarioUbicacionRef, {
          id_ubicacion,
          cantidad: cantidadAjuste
        });
      }
    }
  }
  //#endregion

  //#region Inventario
  async obtenerCantidadPorUbicacion(codigo_barra: string, id_ubicacion: string): Promise<number> {
    // Asumimos que conoces la bodega para formar la ruta.
    // Si no la tienes, primero deberías consultar la ubicación para obtenerla.
    const ubicacionDoc = doc(this.firestore, `ubicaciones/${id_ubicacion}`);
    const ubicacionSnap = await getDoc(ubicacionDoc);

    if (!ubicacionSnap.exists()) throw new Error('Ubicación no encontrada');
    const id_bodega = ubicacionSnap.data()['id_bodega'];

    const inventarioDoc = doc(this.firestore,
      `inventario/${id_bodega}/productos/${codigo_barra}/ubicaciones/${id_ubicacion}`);

    const inventarioSnap = await getDoc(inventarioDoc);

    if (!inventarioSnap.exists()) return 0;

    const data = inventarioSnap.data();
    return data['cantidad'] || 0;
  }

  async getLowStockAlertsOnce(): Promise<any[]> {
    const bodegasSnap = await firstValueFrom(this.getBodegas());
    const alerts: any[] = [];

    for (const bodega of bodegasSnap) {
      const productosRef = collection(this.firestore, `inventario/${bodega.id}/productos`);
      const productosSnap = await getDocs(productosRef);

      productosSnap.forEach(doc => {
        const data = doc.data();
        if (data['total'] < data['stock_min']) {
          alerts.push({
            ...data,
            id: doc.id,
            id_bodega: bodega.id,
            nombre_bodega: bodega.nombreBodega
          });
        }
      });
    }

    return alerts;
  }

  async verificarCantidadDisponible(
    codigo_barra: string,
    id_ubicacion: string,
    cantidadSolicitada: number
  ): Promise<boolean> {
    const cantidadActual = await this.obtenerCantidadPorUbicacion(codigo_barra, id_ubicacion);
    return cantidadActual >= cantidadSolicitada;
  }
  //#endregion

  async obtenerDocumento(path: string) {
    const ref = doc(this.firestore, path);
    return await getDoc(ref);
  }

  async updateDoc(path: string, data: any) {
    const ref = doc(this.firestore, path);
    return await updateDoc(ref, data);
  }
}

export interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  rol: number; // administrador | gestorInventario | comprador | logistica | auditor | gerenteProyecto | trabajadorPlanta
}

export interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  marca: string;
  codigo_barra: string;
  ultima_compra_id: string;
  etiquetas: string[];
}

export interface CompraItem {
  id_producto: string;
  cantidad: number;
  precio_unitario: number;
}

export interface Compra {
  id?: string;
  id_proveedor: string;
  fecha: Date;
  productos: CompraItem[];
}

export interface Bodega {
  id?: string;
  nombreBodega: string;
  direccionBodega: string;
}

export interface Proveedor {
  id?: string;
  nombre: string;
  correo: string;
  rut: string;
  telefono: number;
  direccion: string;
  terminos_pago: string;
}

export interface Ubicacion {
  id?: string;
  zona: string;
  estante: string;
  nivel: string;
  id_bodega: string;
}

export interface Movimiento {
  id?: string;
  codigo_barra: string;
  id_ubicacion: string;
  id_usuario: string;
  fecha: Timestamp;
  cantidad: number;
  accion: string; //Salida | Entrada | Uso | Devolucion | Traslado
  comentario: string;
}

export interface InventarioProductoUbicacion {
  id?: string;
  cantidad: number;
}

export interface InventarioProducto {
  id?: string;
  ubicaciones: InventarioProductoUbicacion[];
  total: number;
  stock_min: number;
}

export interface Inventario {
  id?: string;
  productos: InventarioProducto[];
}