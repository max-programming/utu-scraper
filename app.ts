import fastify from 'fastify';
import FastifyViewPlugin from '@fastify/view';
import scraper from './scraper';

const server = fastify();

server.register(FastifyViewPlugin, {
  engine: {
    ejs: require('ejs'),
  },
});

server.get('/', async (request, reply) => {
  const { attImg, evalImg } = await scraper();
  // return `Attendance: <img src="${attImg.data.data.url}" />\nEvaluation: <img src="${evalImg.data.data.url}" />`;
  return reply.view('./templates/index.ejs', {
    img1: attImg.data.data.url,
    img2: evalImg.data.data.url,
  });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
