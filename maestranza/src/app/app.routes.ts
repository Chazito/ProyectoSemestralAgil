import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'listar-productos',
    loadComponent: () => import('./pages/listar-productos/listar-productos.page').then(m => m.ListarProductosPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1, 2] }
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'editar-productos/:id',
    loadComponent: () => import('./pages/editar-productos/editar-productos.page').then(m => m.EditarProductosPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1, 2] }
  },
  {
    path: 'usuario-list',
    loadComponent: () => import('./pages/usuario-list/usuario-list.page').then(m => m.UsuarioListPage)
  },
  {
    path: 'productos',
    loadComponent: () => import('./vista-inventario/vista-inventario.page').then(m => m.VistaInventarioPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1, 2] }
  },
  {
    path: 'agregar-proveedores',
    loadComponent: () => import('./pages/agregar-proveedores/agregar-proveedores.page').then(m => m.AgregarProveedoresPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 2] }
  },
  {
    path: 'proveedores',
    loadComponent: () => import('./pages/listar-proveedores/listar-proveedores.page').then(m => m.ListarProveedoresPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 2] }
  },
  {
    path: 'editar-proveedores',
    loadComponent: () => import('./pages/editar-proveedores/editar-proveedores.page').then(m => m.EditarProveedoresPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 2] }
  },
  {
    path: 'agregar-bodega',
    loadComponent: () => import('./pages/agregar-bodega/agregar-bodega.page').then(m => m.AgregarBodegaPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'editar-bodega/:id',
    loadComponent: () => import('./pages/editar-bodega/editar-bodega.page').then(m => m.EditarBodegaPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'bodegas',
    loadComponent: () => import('./pages/listar-bodega/listar-bodega.page').then(m => m.ListarBodegaPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'agregar-movimiento',
    loadComponent: () => import('./pages/agregar-movimiento/agregar-movimiento.page').then(m => m.AgregarMovimientoPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 3] }
  },
  {
    path: 'movimientos',
    loadComponent: () => import('./pages/listar-movimientos/listar-movimientos.page').then(m => m.ListarMovimientosPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 3] }
  },
  {
    path: 'editar-movimientos',
    loadComponent: () => import('./pages/editar-movimientos/editar-movimientos.page').then(m => m.EditarMovimientosPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 3] }
  },
  {
    path: 'inventario',
    loadComponent: () => import('./pages/listar-inventario/listar-inventario.page').then(m => m.ListarInventarioPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 3] }
  },
  {
    path: 'acceso-denegado',
    loadComponent: () => import('./pages/acceso-denegado/acceso-denegado.page').then(m => m.AccesoDenegadoPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1, 2, 3, 4, 5, 6] }
  },
  {
    path: 'agregar-ubicacion',
    loadComponent: () => import('./pages/agregar-ubicacion/agregar-ubicacion.page').then(m => m.AgregarUbicacionPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'editar-ubicacion/:id',
    loadComponent: () => import('./pages/editar-ubicacion/editar-ubicacion.page').then(m => m.EditarUbicacionPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'ubicaciones',
    loadComponent: () => import('./pages/listar-ubicaciones/listar-ubicaciones.page').then(m => m.ListarUbicacionesPage),
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  }



];
