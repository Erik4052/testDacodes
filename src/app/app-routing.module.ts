import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserScoreGuard } from './user-score.guard';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadChildren: () => import('./user-table/user-table.module').then(m => m.UserTableModule) },
  { path: 'user-details/:username', loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule),canActivate:[UserScoreGuard] },
  { path: 'error', loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule) },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
