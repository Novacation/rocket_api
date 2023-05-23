import { Request, Response, Router } from 'express'
import { TaskService } from '../services/TaskService'
import { inputValidation } from '../middlewares/tasks/inputValidation'
import { listValidation } from '../middlewares/tasks/listValidation'

export class TaskController {
  private _router = Router()
  private _taskService: TaskService = new TaskService()

  constructor() {
    this.initRoutes()
  }

  private initRoutes(): void {
    this._router.post(
      '/',
      inputValidation,
      async (req: Request, res: Response) => {
        const { title, description } = req.body
        const { Success, ResponseObject } = await this._taskService.createTask(
          title,
          description
        )

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.get(
      '/',
      listValidation,
      async (req: Request, res: Response) => {
        const { title, description } = req.body

        const { Success, ResponseObject } = await this._taskService.listTasks(
          title,
          description,
          res.locals.hasInputs
        )

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.put('/:id', async (req: Request, res: Response) => {
      const { id } = req.params
      const { title, description } = req.body

      const { Success, ResponseObject } =
        await this._taskService.updateTaskById(parseInt(id), title, description)

      res.status(Success ? 200 : 404).json(ResponseObject)
    })

    this._router.delete('/:id', async (req: Request, res: Response) => {
      const { id } = req.params

      const { Success, ResponseObject } =
        await this._taskService.deleteTaskById(parseInt(id))

      res.status(Success ? 200 : 404).json(ResponseObject)
    })
  }

  public getRouter(): Router {
    return this._router
  }
}
