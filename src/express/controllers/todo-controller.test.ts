import * as fc from 'fast-check';
import { MY_CONFIG } from '../../test-utils';
import { Todo } from '../services/todo-service';
import { router as todoRouter } from './todo-controller';
import express from 'express';
import * as http from 'http';
import * as httplease from 'httplease';
import {promisify} from 'util';

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
    const app = express();
    app.use('/todos', todoRouter)
    server = http.createServer(app);
    await promisify(server.listen.bind(server))(PORT);
  });

  afterEach(async () => {
      // @ts-ignore
      await promisify(server.close.bind(server))();
  });
  
  it('basic read operations', async () => {
    jest.mock('../services/todo-service', () => ({
      getTodo: jest.fn().mockReturnValue(Promise.resolve<Todo>({
        id: 0,
        userId: 0,
        completed: true,
        title: 'Convince people to learn Scala'
      }))
    }))

    const response = await client.send();
    console.log(response.statusCode);
    console.log(response.body);
  });
});
