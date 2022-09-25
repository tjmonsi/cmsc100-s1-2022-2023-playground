import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const api = '/api';

describe('Delete todo', async () => {
  let app;
  before(async () => {
    app = await build();
  });

  it('Should be able to delete one todo', async () => {
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
      method: 'DELETE',
      url: `${api}/todo/${id}`
    });

    const result = await response.json();

    result.success.must.be.true();
  });

  after(async () => {
    app.close();
  });
});
