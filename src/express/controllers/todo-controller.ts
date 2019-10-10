import express from 'express'
import { getTodos, getAllTodos } from '../services/todo-service'

export const router = express.Router()

router.get('/', async (req, res) => {
  const todos = await getAllTodos()

  if (req.params.completed) {
    return todos.filter(todo => todo.completed)
  }
  
  res.send(todos)
})
