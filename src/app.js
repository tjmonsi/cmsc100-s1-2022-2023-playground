import Fastify from 'fastify';
import { v4 } from 'uuid';
import { writeFileSync, readFileSync } from 'fs';

const api = '/api';
const dbFile = 'db.json';

export const build = async () => {
  const fastify = Fastify({ logger: true });

  // Create Todo
  fastify.post(`${api}/todo`, async (request, reply) => {
    const { body } = request;
    const { title, text } = body;

    const dbText = readFileSync(dbFile, 'utf8');
    const db = JSON.parse(dbText);

    const id = v4();

    const todo = {
      title,
      text,
      createDate: new Date().getTime(),
      updateDate: new Date().getTime()
    };

    db.todos[id] = todo;

    const newDBText = JSON.stringify(db, null, 2);

    writeFileSync(dbFile, newDBText, 'utf8');

    return {
      id,
      ...todo
    };
  });

  fastify.get(`${api}/todo`, async (request, response) => {
    const dbText = readFileSync(dbFile, 'utf8');
    const db = JSON.parse(dbText);

    return Object
      .entries(db.todos)
      .map(([id, todo]) => ({
        id,
        ...todo
      }))
      .sort((a, b) => b.createDate - a.createDate);
  });

  fastify.get(`${api}/todo/:id`, async (request, response) => {
    const { params } = request;
    const { id } = params;

    const dbText = readFileSync(dbFile, 'utf8');
    const db = JSON.parse(dbText);

    return {
      id,
      ...db.todos[id]
    };
  });

  fastify.put(`${api}/todo/:id`, async (request, response) => {
    const { params, body } = request;
    const { id } = params;
    const { title, text } = body;

    const dbText = readFileSync(dbFile, 'utf8');
    const db = JSON.parse(dbText);

    db.todos[id].title = title || db.todos[id].title;
    db.todos[id].text = text || db.todos[id].text;
    db.todos[id].updateDate = new Date().getTime();

    const newDBText = JSON.stringify(db, null, 2);

    writeFileSync(dbFile, newDBText, 'utf8');

    return {
      id,
      ...db.todos[id]
    };
  });

  fastify.delete(`${api}/todo/:id`, async (request, response) => {
    const { params } = request;
    const { id } = params;

    const dbText = readFileSync(dbFile, 'utf8');
    const db = JSON.parse(dbText);

    delete db.todos[id];

    const newDBText = JSON.stringify(db, null, 2);
    writeFileSync(dbFile, newDBText, 'utf8');

    return {
      success: true
    };
  });

  return fastify;
};
