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
<<<<<<< HEAD
    path: 'editar-productos',
    loadComponent: () => import('./pages/editar-productos/editar-productos.page').then( m => m.EditarProductosPage)
  },



=======
    path: 'usuario-list',
    loadComponent: () => import('./pages/usuario-list/usuario-list.page').then( m => m.UsuarioListPage)
  }

>>>>>>> dcc27b68a90febeb1626ad191969a13317cf01cd
];
