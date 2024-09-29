import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AppState } from './app.state';
import { hydrationMetaReducer } from './hydration.reducer';
import { taskReducer } from './task/task.reducer';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({
    tasks: taskReducer
  })
});

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];