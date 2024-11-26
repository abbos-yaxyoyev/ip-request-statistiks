import fastiftCors from '@fastify/cors';
import fastify from 'fastify';

import 'reflect-metadata';
import { ENV } from './common/config/index';
import { replyDecorator } from './common/decorators/reply.decorator';
import { routesPlugin } from './routes';
import { redis } from './redise/connection';


const server = fastify({ logger: true, bodyLimit: 1024 * 1024 * 5 });

server.register(fastiftCors, { origin: true });

server.register(replyDecorator);
server.register(routesPlugin);

process.on("uncaughtException", (err) => console.error("uncaughtException:  ", err));
process.on("unhandledRejection", (err) => console.error("unhandledRejection:  ", err));

server.ready(async (err) => {

  if (err) throw err;

  try {

    await start();

  } catch (error) {
    throw error;
  }

});

async function start() {
  try {


    let redisError = await redis.initialize();
    if (redisError) {
      console.error(`------------------------------  Redis connect error  -------------------------------`);
      console.error(`ERROR MESSAGE  --> `, redisError.message);
      throw redisError;
    }
    console.info("-----------------------------   REDIS SUCCESS CONNECT    ------------------------------");

    await server.listen({ host: ENV.HTTP_HOST, port: ENV.HTTP_PORT });
    console.info("-----------------------------  SERVER SUCCESS  ------------------------------");

  } catch (error) {
    console.error(`------------------------------  SERVER FAILLED  -------------------------------`);
    console.error(`ERROR :  `, error);
    process.exit(1);
  }
}
