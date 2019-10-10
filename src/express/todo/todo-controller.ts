import express from 'express'
import { Todo, TodoService } from './todo-service'
import { Logger } from '../utils/logger'

export function mkTodoController(
  service: TodoService,
  logger: Logger
) {
  const router = express.Router()

  router.get('/todos', async (req, res) => {
    logger.log({ message: 'Getting all todos' })

    const todos = await service.getAllTodos()

    if (req.params.completed) {
      return todos.filter(todo => todo.completed)
    }
    
    res.send(todos)
  })

  return router
}
