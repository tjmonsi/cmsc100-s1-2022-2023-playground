import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const api = '/api';

describe('Get todos', async () => {
  let app;
  before(async () => {
    app = await build();
  });

  it('Should be able to get todos', async () => {
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
      url: `${api}/todo`
    });

    const results = await response.json();

    const index = results.findIndex(todo => (id === todo.id));

    index.must.not.be.lt(0);
  });

  after(async () => {
    app.close();
  });
});
