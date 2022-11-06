import fastify from 'fastify';
import scraper from './scraper';

const server = fastify();

server.get('/', async (request, reply) => {
  const { attImg, evalImg } = await scraper();
  return `Attendance: <img src="${attImg.data.data.url}" />\nEvaluation: <img src="${evalImg.data.data.url}" />`;
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
