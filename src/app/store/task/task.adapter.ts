import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ITask } from '../../models/task.interface';

export const taskAdapter: EntityAdapter<ITask> = createEntityAdapter<ITask>({
  selectId: (task: ITask) => task.id
})