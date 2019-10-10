import express from 'express'
import { router as todoRouter } from './controllers/todo-controller'

const app = express()
const port = 3000

app.use('/todos', todoRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))