import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const api = '/api';

describe('Update todo', async () => {
  let app;
  before(async () => {
    app = await build();
  });

  it('Should be able to update todo with both title and text', async () => {
    const todo = {
      title: 'This is a title',
      text: 'This is a text'
    };

    const newTodo = {
      title: 'This is a new Title',
      text: 'This is a new text'
    };

    // create first
    const createResponse = await app.inject({
      method: 'POST',
      url: `${api}/todo`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${api}/todo/${id}`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newTodo.title);
    result.text.must.be.equal(newTodo.text);
  });

  it('Should be able to update todo with title only', async () => {
    const todo = {
      title: 'This is a title 2',
      text: 'This is a text'
    };

    const newTodo = {
      title: 'This is a new Title 3'
    };

    // create first
    const createResponse = await app.inject({
      method: 'POST',
      url: `${api}/todo`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${api}/todo/${id}`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(newTodo.title);
    result.text.must.be.equal(todo.text);
  });

  it('Should be able to update todo with text only', async () => {
    const todo = {
      title: 'This is a title 2',
      text: 'This is a text'
    };

    const newTodo = {
      text: 'This is a text 2'
    };

    // create first
    const createResponse = await app.inject({
      method: 'POST',
      url: `${api}/todo`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${api}/todo/${id}`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(todo.title);
    result.text.must.be.equal(newTodo.text);
  });

  after(async () => {
    app.close();
  });
});
