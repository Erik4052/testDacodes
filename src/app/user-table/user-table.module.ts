import { NgModule } from '@angular/core';
import { UserTableComponent } from './user-table.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: UserTableComponent }
  ];

@NgModule({
  declarations: [UserTableComponent],
  imports: [MaterialModule, RouterModule.forChild(routes), ReactiveFormsModule, CommonModule],
  exports: [UserTableComponent, RouterModule]
})
export class UserTableModule { }
