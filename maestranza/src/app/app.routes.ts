import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-productos',
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

];
