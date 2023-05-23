import { ITask } from '../interfaces/ITask'
import { ServiceResponse } from '../model/ServiceResponse'
import { Task } from '../database/dbmodels/Task'

export class TaskService implements ITask {
  public async createTask(
    title: string,
    description: string
  ): Promise<ServiceResponse<Task>> {
    const serviceResponse: ServiceResponse<Task> = new ServiceResponse<Task>()

    try {
      serviceResponse.Data = await Task.create(
        { title, description },
        { validate: true }
      )
    } catch (e) {
      console.error(e)
      serviceResponse.Message = `Falha ao criar task`

      serviceResponse.Success = false
    }

    return serviceResponse
  }

  public async listTasks(
    title: string,
    description: string,
    hasInputs: boolean
  ): Promise<ServiceResponse<Task[]>> {
    const serviceResponse = new ServiceResponse<Task[]>()

    try {
      serviceResponse.Data = hasInputs
        ? await Task.findAll({
            where: {
              title,
              description
            }
          })
        : await Task.findAll({})
    } catch (e) {
      console.error(e)
      serviceResponse.Message = `Falha ao buscar tasks com título: ${title} e descrição: ${description}`

      serviceResponse.Success = false
    }

    return serviceResponse
  }

  public async updateTaskById(
    id: number,
    title: string,
    description: string
  ): Promise<ServiceResponse<Task | null>> {
    const serviceResponse = new ServiceResponse<Task | null>()

    try {
      const taskByPk: Task | null = await Task.findByPk(id)
      if (!taskByPk) {
        throw new Error()
      }

      taskByPk.setDataValue(
        'title',
        title.length ? title : taskByPk.dataValues.title
      )

      taskByPk.setDataValue(
        'description',
        description.length ? description : taskByPk.dataValues.description
      )
      await taskByPk.save()

      serviceResponse.Data = taskByPk
    } catch (e) {
      console.error(e)
      serviceResponse.Message = `Task com id: ${id}, não existe`

      serviceResponse.Success = false
    }

    return serviceResponse
  }

  public async deleteTaskById(
    id: number
  ): Promise<ServiceResponse<Task | null>> {
    const serviceResponse = new ServiceResponse<Task | null>()

    try {
      const taskByPk: Task | null = await Task.findByPk(id)

      if (!taskByPk) {
        throw new Error()
      }

      serviceResponse.Data = taskByPk

      await taskByPk.destroy({ force: true })
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = `Id: ${id} inválido`
    }

    return serviceResponse
  }
}
