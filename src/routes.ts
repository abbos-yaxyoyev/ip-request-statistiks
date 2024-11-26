import fp from 'fastify-plugin';
import { userRoutes } from './user/routes';

const routes = [
  ...userRoutes
];

export const routesPlugin = fp(function (fastify, options, next) {
  try {

    routes.forEach((route) => fastify.route(route));

  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  next();
});
