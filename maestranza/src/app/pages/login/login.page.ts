import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonList, IonInput, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
  
  constructor(private router: Router, private alertController: AlertController) {
    // Registramos los iconos que vamos a usar
    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });
  }

  ngOnInit() {
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

  // estos son los que añadi por defecto mientras no ocupemos bd, pero una vez lo ocupemos el formulario servira igual
  Elogistica = {
    correo: 'elogistica@gmail.com',
    contrasena: 'Elogistica123.'
  };

  Ginventario = {
    correo: 'ginventario@gmail.com',
    contrasena: 'Ginventario123.'
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
  Ingresar(){
    
    if (this.objetoLogin.correo === this.Elogistica.correo && this.objetoLogin.contrasena === this.Elogistica.contrasena) {
      this.alertaIni('Usuario: Encargado de logistica');
      this.limpiarFormulario();
      this.router.navigate(['/listar-productos']);
    }
    else if (this.objetoLogin.correo === this.Ginventario.correo && this.objetoLogin.contrasena === this.Ginventario.contrasena) {
      this.alertaIni('Usuario: Gestor de inventario');
      this.limpiarFormulario();
      this.router.navigate(['/listar-productos']);
    }
    else {
      this.limpiarFormulario();
      this.alertaIni('Usuario o contraseña incorrecta');
    }
  }
}
