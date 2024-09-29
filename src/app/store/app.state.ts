import * as fromTask from './task/task.state';

export interface AppState {
  tasks: fromTask.TaskState;
}

export const initialAppState: AppState = {
  tasks: fromTask.initialTaskState
}

export function getInitialState(): AppState {
  return initialAppState;
}