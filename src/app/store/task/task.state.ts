import { EntityState } from "@ngrx/entity";
import { ITask } from "../../models/task.interface";

export interface TaskState extends EntityState<ITask> {
  allTasks: ITask[];
  loading: boolean;
}

export const initialTaskState: TaskState = {
  ids: [],
  entities: {},
  allTasks: [],
  loading: false
}