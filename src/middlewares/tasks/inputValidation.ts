import { NextFunction, Request, Response } from 'express'
import { ServiceResponse } from '../../model/ServiceResponse'

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { title, description } = req.body

    if (!(title.length > 0 && title.length <= 50)) {
      throw new Error('')
    }

    if (!(description.length > 0 && description.length <= 100)) {
      throw new Error()
    }

    next()
  } catch (e) {
    const serviceResponse = new ServiceResponse()

    serviceResponse.Success = false
    serviceResponse.Message = `Falha ao validar dados`

    res.status(404).json(serviceResponse.ResponseObject)
  }
}
