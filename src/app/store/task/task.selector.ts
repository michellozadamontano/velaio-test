import { createFeatureSelector, createSelector } from '@ngrx/store';

import { taskAdapter } from './task.adapter';
import { TaskState } from './task.state';


export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTaskList = createSelector(
  selectTaskState,
  taskAdapter.getSelectors().selectAll
)