import * as fc from 'fast-check';
import { MY_CONFIG } from '../../test-utils';
import { Todo, TodoService } from './todo-service';
import { router as todoRouter, TodoController, mkTodoController } from './todo-controller';
import express from 'express';
import * as http from 'http';
import * as httplease from 'httplease';
import {promisify} from 'util';
import { Logger } from '../utils/logger';

describe("", () => {
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
  
  it('basic read operations', async () => {
    const app = express();

    const logger = new Logger({})
    const service = new TodoService({
      baseUrl: "https://jsonplaceholder.typicode.com/todos"
    });

    app.use('/todos', mkTodoController(service, logger))
    server = http.createServer(app);

    await promisify(server.listen.bind(server))(PORT);

    service.getTodo = jest.fn().mockResolvedValue({
      id: 0,
      userId: 0,
      completed: true,
      title: 'Convince people to learn Scala'
    });

    const response = await client.send();
    console.log(response.statusCode);
    console.log(response.body);
  });
});
