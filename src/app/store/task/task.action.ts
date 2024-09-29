import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITask } from 'src/app/models/task.interface';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: ITask[] }>(),
    'Load Tasks Failure': props<{ error: any }>(),
    'Add Task': props<{ task: ITask }>(),
    'Add Tasks Success': props<{ task: ITask }>(),
    'Add Tasks Failure': props<{ error: any }>(),
    'Update Task': props<{ task: ITask }>(),
    'Update Task Success': props<{ task: ITask }>(),
    'Update Task Failure': props<{ error: any }>(),
    'Get Tasks By Status': props<{ status: string }>(),
    'Get Tasks By Status Success': props<{ tasks: ITask[] }>(),
    'Get Tasks By Status Failure': props<{ error: any }>(),
    'Mark Task Completed': props<{ id: number }>(),
  }
})