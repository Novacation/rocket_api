import { ServiceResponse } from '../model/ServiceResponse'
import { Task } from '../database/dbmodels/Task'

export interface ITask {
  createTask(title: string, description: string): Promise<ServiceResponse<Task>>

  listTasks(
    title: string,
    description: string,
    hasInputs: boolean
  ): Promise<ServiceResponse<Task[]>>

  updateTaskById(
    id: number,
    title: string,
    description: string
  ): Promise<ServiceResponse<Task | null>>

  deleteTaskById(id: number): Promise<ServiceResponse<Task | null>>
}
