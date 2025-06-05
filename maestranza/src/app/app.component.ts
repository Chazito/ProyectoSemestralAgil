import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, cubeOutline, homeOutline, locationOutline, logOutOutline, peopleOutline, pricetagOutline, storefrontOutline, swapHorizontalOutline } from 'ionicons/icons';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote,
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,
    CommonModule, RouterModule
  ],
})
export class AppComponent implements OnInit {
  user: any = null;
  // administrador | gestorInventario | comprador | logistica | auditor | gerenteProyecto | trabajadorPlanta
  roles: any = ["Administrador", "Gestor Inventario", "Comprador", "Logistica", "Auditor", "Gerente Proyecto", "Trabajador"];

  // 0 = administrador, 1 = gestorInventario, etc.
  private permisosPorRol: { [rol: number]: any[] } = {
    0: [ // administrador
      { title: 'Dashboard', url: '/home', icon: 'home-outline' },
      { title: 'Vista Inventario', url: '/inventario', icon: 'cube-outline' },
      { title: 'Proveedores', url: '/proveedores', icon: 'people-outline' },
      { title: 'Bodegas', url: '/bodegas', icon: 'storefront-outline' },
      { title: 'Ubicaciones', url: '/ubicaciones', icon: 'location-outline' },
      { title: 'Productos', url: '/productos', icon: 'pricetag-outline' },
      { title: 'Movimientos', url: '/movimientos', icon: 'swap-horizontal-outline' },
      { title: 'Agregar Movimiento', url: '/agregar-movimiento', icon: 'add-circle-outline' }
    ],
    2: [ // comprador
      { title: 'Proveedores', url: '/proveedores', icon: 'people-outline' },
      { title: 'Productos', url: '/productos', icon: 'pricetag-outline' }
    ],
    1: [ // gestor inventario
      { title: 'Vista Inventario', url: '/vista-inventario', icon: 'cube-outline' },
      { title: 'Bodegas', url: '/bodegas', icon: 'storefront-outline' },
      { title: 'Ubicaciones', url: '/ubicaciones', icon: 'location-outline' },
      { title: 'Productos', url: '/productos', icon: 'pricetag-outline' }
    ],
    3: [ //Logistica
      { title: 'Movimientos', url: '/movimientos', icon: 'swap-horizontal-outline' },
      { title: 'Agregar Movimiento', url: '/agregar-movimiento', icon: 'add-circle-outline' }
    ],
    // Agrega más roles según sea necesario
  };


  get appPages(): any[] {
    if (!this.user || this.user.rol === undefined) return [];
    return this.permisosPorRol[this.user.rol] || [];
  }

  constructor(private router: Router, private userService: UserService) {
    addIcons({ cubeOutline, logOutOutline, locationOutline, storefrontOutline, pricetagOutline, homeOutline, addCircleOutline, swapHorizontalOutline, peopleOutline });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

}
