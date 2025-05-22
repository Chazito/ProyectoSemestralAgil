import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private firestore: Firestore) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.userSubject.next(this.userData);
    }
  }

  async setUser(email: string): Promise<void> {
    const userDocRef = doc(this.firestore, `usuarios/${email}`);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const user = {
        email: email,
        nombre: data['nombre'],
        apellido: data['apellido']
      };

      this.userData = user;
      this.userSubject.next(this.userData);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.warn('User document not found.');
    }
  }

  getUser(): any {
    return this.userData;
  }

  clearUser() {
    this.userData = null;
    this.userSubject.next(this.userData);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.userData;
  }
}
