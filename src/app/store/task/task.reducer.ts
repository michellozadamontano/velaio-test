import { Action, createReducer, on } from '@ngrx/store';

import { Status } from 'src/app/models/task.interface';
import { TaskActions } from './task.action';
import { taskAdapter } from './task.adapter';
import { TaskState, initialTaskState } from './task.state';


export const taskReducer = createReducer<TaskState>(
  initialTaskState,
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    // First, update the allTasks property
    const updatedState = {
      ...state,
      allTasks: tasks, // Store all tasks separately for filtering
      loading: false
    };

    // Then, use taskAdapter to set all tasks in the adapter state
    return taskAdapter.setAll(tasks, updatedState);
  }),
  on(TaskActions.getTasksByStatus, (state, { status }) => {

    // return taskAdapter.setAll(filteredTasks, { ...state });
    const filteredTasks = state.allTasks.filter(task => task.status === status);

    // Set the filtered tasks in the state
    return taskAdapter.setAll(filteredTasks, {
      ...state,
      filteredTasks // Keep filtered tasks for the current filter
    });
  }),
  on(TaskActions.markTaskCompleted, (state, { id }) => {

    // Find the task by id
    const task = state.entities[id];

    if (!task) {
      return state; // If the task doesn't exist, return the state unchanged
    }

    // Use taskAdapter.updateOne to update only the necessary fields (status)
    return taskAdapter.updateOne(
      {
        id,
        changes: { status: Status.COMPLETED } // Only update the status field
      },
      state
    );
  })
)

export const reducer = (state: TaskState | undefined, action: Action) => {
  return taskReducer(state, action);
}