import { RouteOptions } from "fastify";
import { getStatisticsByIP, getStatisticsByRoute, register, } from "./controller";
import { auth } from "./auth";


export const userRoutes: RouteOptions[] = [

  {
    method: 'POST',
    url: `/user`,
    preValidation: [auth],
    handler: register,
  },
  {
    method: 'GET',
    url: `/statistics/ip/:ip`,
    preValidation: [auth],
    handler: getStatisticsByIP,
  },
  {
    method: 'POST',
    url: `/statistics/route`,
    preValidation: [auth],
    handler: getStatisticsByRoute,
  }

];
