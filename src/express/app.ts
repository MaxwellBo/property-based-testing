import express from 'express'
import { router as todoRouter } from './todo/todo-controller'

const app = express()
const port = 3000

app.use('/todos', todoRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))