import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'home',
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'list-details/:id',
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () => import('./pages/list-details/list-details.module').then( m => m.ListDetailsPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'todo-details/:idL/:idT',
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () => import('./pages/todo-details/todo-details.module').then(m => m.TodoDetailsPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
