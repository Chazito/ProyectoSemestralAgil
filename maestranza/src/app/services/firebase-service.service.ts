import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  private collectionUsuarios = "usuarios";
  private collectionProductos = "productos";

  constructor(private firestore: Firestore) { }

  getUsuarios() : Observable<any[]>{
    const userCollection = collection(this.firestore, this.collectionUsuarios);
    return collectionData(userCollection, {idField: "id"});
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
}

export interface Usuario{
  id? : string;
  nombre : string;
  apellido : string;
  email : string;
}

export interface Producto{
  id? : string;
  nombre : string;
  descripcion : string;
  ultimo_precio : number;
  codigo_barra : string;
}