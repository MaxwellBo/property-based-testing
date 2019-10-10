export interface Todo {
    id: number,
    userId: number,
    title: string
    completed: boolean
}

class TodoService {
  baseUrl: string

  constructor(
    url: string
  ) {
    this.baseUrl = url
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
