export interface Todo {
    id: number,
    userId: number,
    title: string
    completed: boolean
}

interface TodoServiceProps {
  baseUrl: string
}

export class TodoService {
  baseUrl: string

  constructor(
    props: TodoServiceProps
  ) {
    this.baseUrl = props.baseUrl
  }

  async getTodo(id: string): Promise<Todo> {
    return fetch(`${this.baseUrl}/todos/${id}`)
      .then(response => response.json())
  }

  async getTodos(ids: string[]): Promise<Todo[]> {
    return Promise.all(ids.map(this.getTodo))
  }

  async getAllTodos(): Promise<Todo[]> {
    return fetch(`${this.baseUrl}/todos`)
      .then(response => response.json())
  }
}
