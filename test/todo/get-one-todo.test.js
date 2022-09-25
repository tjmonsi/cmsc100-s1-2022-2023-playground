import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const api = '/api';

describe('Get todo', async () => {
  let app;
  before(async () => {
    app = await build();
  });

  it('Should be able to get one todo', async () => {
    const todo = {
      title: 'This is a title',
      text: 'This is a text'
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
      method: 'GET',
      url: `${api}/todo/${id}`
    });

    const result = await response.json();

    result.id.must.be.equal(id);
    result.title.must.be.equal(todo.title);
    result.text.must.be.equal(todo.text);
  });

  after(async () => {
    app.close();
  });
});
