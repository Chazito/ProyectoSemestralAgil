import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  private collectionUsuarios = "usuarios";
  private collectionProductos = "productos";
  private collectionBodegas = "bodegas";
  private collectionProveedores = "proveedores";

  constructor(private firestore: Firestore ,  private alertController: AlertController) { }

    async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getUsuarios() : Observable<any[]>{
    const userCollection = collection(this.firestore, this.collectionUsuarios);
    return collectionData(userCollection, {idField: "id"});
  }
  
  getUsuarioByEmail(email : string) : Observable<any>{
    const usuario = doc(this.firestore, `${this.collectionUsuarios}/${email}`);
    return docData(usuario, {idField:'id'});
  }

  async datosValidos(email : string, password : string) : Promise<boolean>{
    const usuario = doc(this.firestore, `${this.collectionUsuarios}/${email}`);
    const docSnap = await getDoc(usuario);
    if(!docSnap.exists()){
      console.log("User doesn't exists")
      return false;
    }

    const data = docSnap.data();
    return data['contrasena'] == password;
  }

  async agregarProducto(data : Producto) : Promise<void>{
    const productCollection = collection(this.firestore, this.collectionProductos);
    await addDoc(productCollection, data);
  }

  getProductos() : Observable<any[]>{
    const productCollection = collection(this.firestore, this.collectionProductos);
    return collectionData(productCollection, {idField: "id"});
  }

  getProductoById(id : string) : Observable<any>{
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    return docData(producto, {idField: 'id'});
  }

  async updateProducto(id : string, data: any) : Promise<void>{
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    await updateDoc(producto, data); 
  }

  async deleteProducto(id : string) : Promise<void>{
    const producto = doc(this.firestore, `${this.collectionProductos}/${id}`);
    await deleteDoc(producto);
  }

  //para las bodegas 
  async agregarBodega(data : Bodega) : Promise<void>{
    const bodegaCollection = collection(this.firestore, this.collectionBodegas);
    await addDoc(bodegaCollection, data);
  }

  getBodegas() : Observable<any[]>{
    const bodegaCollection = collection(this.firestore, this.collectionBodegas);
    return collectionData(bodegaCollection, {idField: "id"});
  }

  getBodegaById(id : string) : Observable<any>{
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    return docData(bodega, {idField: 'id'});
  }

  async updateBodega(id : string, data: any) : Promise<void>{
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    await updateDoc(bodega, data); 
  }

  async deleteBodega(id : string) : Promise<void>{
    const bodega = doc(this.firestore, `${this.collectionBodegas}/${id}`);
    await deleteDoc(bodega);
  async agregarProveedor(proveedor : Proveedor) : Promise<void>{
    const proveedorCollection = collection(this.firestore, this.collectionProveedores);
    await addDoc(proveedorCollection, proveedor);
  }

  async updateProveedor(id : string, data : any) : Promise<void> {
    const proveedor = doc(this.firestore, `${this.collectionProveedores}/${id}`);
    await updateDoc(proveedor, data);
  }

  async deleteProveedor(id : string) : Promise<void> {
    const proveedor = doc(this.firestore, `${this.collectionProveedores}/${id}`);
    await deleteDoc(proveedor);
  }

  getProveedores() : Observable<any[]>{
    const proveedorCollection = collection(this.firestore, this.collectionProveedores);
    return collectionData(proveedorCollection, )
  }
}

export interface Usuario{
  id? : string;
  nombre : string;
  apellido : string;
  email : string;
  contrasena : string;
  rol : number;
}

export interface Producto{
  id? : string;
  nombre : string;
  descripcion : string;
  marca : string;
  codigo_barra : string;
  bodega_elegida : number;
}

export interface Bodega{
  id? : string;
  codigoBodega : string;
  nombreBodega : string;
  direccionBodega : string;
  capacidad : number;
  ultima_compra_id : string;
  etiquetas : [];
}

export interface Proveedor{
  id? : string;
  nombre : string;
  correo : string;
  rut : string;
  telefono : number;
  direccion : string;
  terminos_pago : string;
}

export interface Sucursal{
  id? : string;
  nombre : string;
  direccion : string;
}

export interface Ubicacion {
  id? : string;
  zona : string;
  estante : string;
  nivel : string;
}

export interface Movimiento {
  id? : string;
  codigo_barra : string;
  id_ubicacion : string;
  id_usuario : string;
  fecha : Date;
  cantidad : number;
  accion : string; //Salida | Entrada | Uso | Devolucion | Traslado
  comentario : string;
}

export interface Inventario {
  id? : string;
  id_sucursal : string;
  id_producto : string;
  stock : number;
  stock_bajo : number;
}

export interface Compra{
  id? : string;
  id_proveedor : string;
  productos : [];
}