import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent }
];


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserDetailsModule { }
