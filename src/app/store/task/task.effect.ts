import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import { TaskActions } from './task.action';


@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) { }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => this.taskService.getTasks().pipe(
        map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
        catchError((error) => of(TaskActions.loadTasksFailure({ error })))
      ))
    )
  );


  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap((action) => this.taskService.createTask(action.task).pipe(
        map((task) => TaskActions.addTasksSuccess({ task })),
        catchError((error) => of(TaskActions.addTasksFailure({ error })))
      ))
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap((action) => this.taskService.updateTask(action.task).pipe(
        map(() => TaskActions.updateTaskSuccess({ task: action.task })),
        catchError((error) => of(TaskActions.updateTaskFailure({ error })))
      )),
      // After the task is updated successfully, load all tasks again
      concatMap(() => [
        TaskActions.loadTasks() // Dispatch loadTasks action
      ])
    )
  );
}