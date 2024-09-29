import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ITask } from 'src/app/models/task.interface';
import { AppState } from 'src/app/store/app.state';
import { TaskActions } from 'src/app/store/task/task.action';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, MatInputModule],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  title = 'Crear Nueva Tarea';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  onSubmit(event: ITask): void {

    this.store.dispatch(TaskActions.addTask({ task: event }));

    this.router.navigate(['/task-list']);
  }

  onCancel(): void {
    this.router.navigate(['/task-list']);
  }
}
