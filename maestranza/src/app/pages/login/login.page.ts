import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonList, IonInput, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { UserService } from 'src/app/services/user.service';
import { MockDataService } from 'src/app/services/mock-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonList, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  // Variable para controlar la visibilidad de la contraseña
  showPassword = false;

  constructor(private router: Router, private alertController: AlertController, private fireService: FirebaseServiceService, private userService: UserService) {
    // Registramos los iconos que vamos a usar
    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  //con este comparara los datos
  objetoLogin = {
    correo: '',
    contrasena: ''
  };

  //limpiara el formulario
  async limpiarFormulario() {
    this.objetoLogin.correo = '';
    this.objetoLogin.contrasena = '';
  }

  // alertas simple temporal la idea luego es llamarla desde la bd y pasarle el mensaje
  async alertaIni(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Inicio de sesión',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }


  //funcion que valida los datos y muestra las alertas
  async Ingresar() {
    // Verificar si los campos están vacíos
    if (!this.objetoLogin.correo.trim() || !this.objetoLogin.contrasena.trim()) {
      this.alertaIni('Por favor complete todos los campos');
      return;
    }

    // Verificar las credenciales
    if (await this.fireService.datosValidos(this.objetoLogin.correo, this.objetoLogin.contrasena)) {
      await this.userService.setUser(this.objetoLogin.correo);
      this.alertaIni('Login correcto');
      this.limpiarFormulario();
      this.router.navigate(['/dashboard']);
    }
    else {
      this.limpiarFormulario();
      this.alertaIni('Usuario o contraseña incorrecta');
    }
  }
}