import { IUser } from "./user.interface";

/**
 * Represents a task
 *
 * @export
 * @interface ITask
 */
export interface ITask {
  /**
   * The id of the task
   */
  id: number;
  /**
   * The title of the task
   */
  title: string;
  /**
   * The deadline for the task
   */
  deadline: Date;
  /**
   * The status of the task
   */
  status: Status;
  /**
   * The users assigned to the task
   */
  users: IUser[];
}


export enum Status {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING"
}