import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'task-list',
        loadComponent: () => import('./task/containers/task-list/task-list.component').then(m => m.TaskListComponent)
      },
      {
        path: 'task-add',
        loadComponent: () => import('./task/containers/task-add/task-add.component').then(m => m.TaskAddComponent)
      },
      {
        path: 'task-update/:id',
        loadComponent: () => import('./task/containers/task-update/task-update.component').then(m => m.TaskUpdateComponent)
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
