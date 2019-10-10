import * as fc from 'fast-check';
import { MY_CONFIG } from '../../test-utils';
import { Todo, TodoService } from './todo-service';
import { mkTodoController } from './todo-controller';
import express from 'express';
import * as http from 'http';
import * as httplease from 'httplease';
import {promisify} from 'util';
import { Logger } from '../utils/logger';

describe("todo-controller", () => {
  // @ts-ignore
  let server: any;
  const PORT = 9999;
  // @ts-ignore
  const client = httplease.builder()
    .withBaseUrl(`http://localhost:${PORT}`)
    .withPath('/todos')
    .withTimeout(10000)
    .withBufferJsonResponseHandler()
    .withMethodGet()
    .withExpectStatus([200]);

  beforeEach(async () => {
  });

  afterEach(async () => {
      // @ts-ignore
      await promisify(server.close.bind(server))();
  });
  
  it.skip('basic read operations', async () => {
    const app = express();

    const logger = new Logger({})
    const service = new TodoService({
      baseUrl: "https://jsonplaceholder.typicode.com"
    });

    app.use('/', mkTodoController(service, logger))
    server = http.createServer(app);

    await promisify(server.listen.bind(server))(PORT);

    const todo0 = {
      id: 0,
      userId: 0,
      completed: false, // sadly
      title: 'Convince people to learn Scala'
    }

    const todo1 = {
      id: 1,
      userId: 1,
      completed: false, // never gonna happen
      title: 'Convince people to learn Haskell'
    }

    const todo2 = {
      id: 1,
      userId: 1,
      completed: false, // snowballs chance in hell
      title: 'Convince people to learn Erlang'
    }

    const allTodos = [todo0, todo1, todo2]

    service.getAllTodos = jest.fn().mockResolvedValue(allTodos);

    const response = await client.send();
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(allTodos)
    expect(service.getAllTodos).toBeCalledTimes(1)
  });
});
