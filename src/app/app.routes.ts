import { Routes } from '@angular/router';
import { CanActivateAuth, CanActivateDashboard, CanActivateFormBuilder } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),
    canActivate: [CanActivateAuth]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [CanActivateDashboard],
    children: [
      {
        path: 'form-build',
        loadComponent: () => import('./dashboard/form-builder/form-builder.component').then(m => m.FormBuilderComponent),
        canActivate: [CanActivateFormBuilder]
      },
      {
        path: 'form-view',
        loadComponent: () => import('./dashboard/form-viewer/form-viewer.component').then(m => m.FormViewerComponent)
      },
      {
        path: 'form-submit',
        loadComponent: () => import('./dashboard/form-submit/form-submit.component').then(m => m.FormSubmitComponent)
      },
      {
        path: '',
        redirectTo: 'form-build',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
