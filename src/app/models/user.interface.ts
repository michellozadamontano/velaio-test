import { ISkill } from "./skill.interface";

/**
 * User interface
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  /**
   * User ID
   *
   * @type {number}
   * @memberof IUser
   */
  id: number;

  /**
   * Full name
   *
   * @type {string}
   * @memberof IUser
   */
  fullName: string;

  /**
   * Age
   *
   * @type {number}
   * @memberof IUser
   */
  age: number;

  /**
   * Skills
   *
   * @type {ISkill[]}
   * @memberof IUser
   */
  skills: ISkill[];
}

