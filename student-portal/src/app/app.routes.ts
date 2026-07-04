import { Routes } from '@angular/router';

export const routes: Routes = [
     {
    path: 'hr',
    loadChildren: () => import('./modules/hr/hr-module').then(m => m.HrModule)
  }
];
