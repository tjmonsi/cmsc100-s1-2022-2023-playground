import { build } from './app.js';

async function start () {
  try {
    const server = await build();
    const addr = await server.listen({
      port: '8080',
      address: '0.0.0.0'
    });
    console.log(`Listening on ${addr}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
