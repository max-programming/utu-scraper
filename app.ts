import fastify from 'fastify';
import FastifyViewPlugin from '@fastify/view';
import FastifyEnvPlugin from '@fastify/env';
import scraper from './scraper';

const server = fastify();

server.register(FastifyEnvPlugin, {
  dotenv: true,
  schema: {
    type: 'object',
    properties: {
      USER_ID: { type: 'string' },
      PASSWORD: { type: 'string' },
      IMGBB_KEY: { type: 'string' },
    },
  },
});
server.register(FastifyViewPlugin, {
  engine: {
    ejs: require('ejs'),
  },
});

server.get('/', (request, reply) => {
  return reply.view('./templates/index.ejs');
});

server.get('/attendance', async (request, reply) => {
  const image = await scraper('attendance');
  return reply.view('./templates/screenshotPage.ejs', {
    image: image.data.data.display_url,
    title: 'Attendance Page',
  });
});

server.get('/evaluation', async (request, reply) => {
  const image = await scraper('evaluation');
  return reply.view('./templates/screenshotPage.ejs', {
    image: image.data.data.display_url,
    title: 'Evaluation Page',
  });
});

server.listen(
  {
    port: 8080,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1',
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);
