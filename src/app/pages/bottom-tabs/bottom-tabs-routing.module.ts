import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BottomTabsPage } from './bottom-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: BottomTabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../home/home.module').then( m => m.HomePageModule),
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule),
          }
        ]
      },
      {
        path: 'scan',
        children: [
          {
            path: '',
            loadChildren: () => import('../scan/scan.module').then(m => m.ScanPageModule),
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomTabsPageRoutingModule {}
