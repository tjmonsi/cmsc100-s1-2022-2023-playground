import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const api = '/api';

describe('Create a todo', async () => {
  let app;
  before(async () => {
    app = await build();
  });

  it('Should create a todo', async () => {
    const todo = {
      title: 'This is a title',
      text: 'This is a text'
    };

    const response = await app.inject({
      method: 'POST',
      url: `${api}/todo`,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    const result = await response.json();

    result.id.must.not.be.null();
    result.title.must.be.equal(todo.title);
    result.text.must.be.equal(todo.text);
  });

  after(async () => {
    app.close();
  });
});
