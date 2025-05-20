import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  private collectionUsuarios = "usuarios";

  constructor(private firestore: Firestore) { }

  getUsuarios() : Observable<any[]>{
    const userCollection = collection(this.firestore, this.collectionUsuarios);
    return collectionData(userCollection, {idField: "id"});
  }
}
