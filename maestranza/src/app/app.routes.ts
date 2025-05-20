import { Routes } from '@angular/router';

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
    loadComponent: () => import('./pages/listar-productos/listar-productos.page').then( m => m.ListarProductosPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },  {
    path: 'editar-productos',
    loadComponent: () => import('./pages/editar-productos/editar-productos.page').then( m => m.EditarProductosPage)
  },



];
