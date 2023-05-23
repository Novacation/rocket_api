import { config } from 'dotenv'

config()
import express, { Express } from 'express'
import { json, urlencoded } from 'body-parser'
import { connection } from './database/connection'
import { Task } from './database/dbmodels/Task'
import { TaskController } from './controllers/TaskController'

const app: Express = express()

app.use(urlencoded({ extended: true }))

app.use(json())

app.use('/tasks', new TaskController().getRouter())

const port: number = 8000

connection
  .authenticate()
  .then(async () => {
    app.listen(port, async (): Promise<void> => {
      await connection.sync()
      await Task.sync()
    })
  })
  .catch((error): void => {
    console.log(error)
  })
