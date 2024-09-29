import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ITask, Status } from 'src/app/models/task.interface';
import { AppState } from 'src/app/store/app.state';
import { TaskActions } from 'src/app/store/task/task.action';
import * as selector from 'src/app/store/task/task.selector';
import { PersonComponent } from '../../components/person/person.component';

export interface Filters {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    PersonComponent,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  statuses: Filters[] = [
    { value: 'ALL', viewValue: 'Todas' },
    { value: 'COMPLETED', viewValue: 'Completadas' },
    { value: 'PENDING', viewValue: 'Pendientes' },
  ];
  selectedStatus = 'ALL';
  selectTaskList$ = this.store.select(selector.selectTaskList);
  loading$ = this.store.select(state => state.tasks.loading);
  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  loadAllTasks(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addTasks(): void {
    this.router.navigate(['task-add']);
  }

  /**
   * Filters the tasks by status.
   * If the selected status is 'ALL', it dispatches the action to load all tasks.
   * Otherwise, it dispatches the action to get the tasks by the selected status.
   * @param status The selected status
   */
  filterTasks(status: Filters['value']): void {
    if (status === 'ALL') {
      // Load all tasks
      this.store.dispatch(TaskActions.loadTasks());
    } else {
      // Get tasks by the selected status
      this.store.dispatch(TaskActions.getTasksByStatus({ status }));
    }
  }

  /**
   * Updates the task status to COMPLETED and dispatches the action to
   * update the task in the store.
   * @param task The task to update
   */
  markAsCompleted(task: ITask): void {
    // Clone the task to avoid modifying the original task
    const updateTask = { ...task, status: Status.COMPLETED };
    // Dispatch the action to update the task in the store
    this.store.dispatch(TaskActions.updateTask({ task: updateTask }));
    // Dispatch the action to mark the task as completed in the store
    this.store.dispatch(TaskActions.markTaskCompleted({ id: task.id }));
  }
}
