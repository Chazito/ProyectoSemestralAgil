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
    path: 'usuario-list',
    loadComponent: () => import('./pages/usuario-list/usuario-list.page').then( m => m.UsuarioListPage)
  }

];
