import moment from "moment";
import { CommonException } from "../common/errors";
import { redis } from "../redise/connection";
import { FastifyRequest } from "fastify";

export async function auth(request: FastifyRequest, reply) {
    try {

        // YYYY-MM-DDTHH:mm:ss --> format orqali har secund dagi harbir ip ga mos requestlar sonini aniqlasa bo'ladi
        // Yuqoridagi statistikani secund emas minutga ham ko'chirib minutlik, 
        // har 30 secundga yoki o'zimizga qulay vaqt oralig'iga moslab olsak bo'ladi

        // Statistikani aniqlash uchun vaqt
        const time = moment().format('YYYY-MM-DDTHH:mm:00') // --> minutlik statistika uchun time
        const ipKey = `stats:ip::${request.ip}::${time}`;
        const routeKey = `stats:route::${request.routerPath}::${request.ip}::${time}`;
        const blockKey = `blockip::${request.ip}`;


        const ipBlocked = await redis.client.exists(blockKey)
        if (ipBlocked) {
            return reply.status(401).send({ error: 'Blocked your ip' });
        }

        const ipCount = await redis.incr(ipKey);
        const routeCount = await redis.incr(routeKey); //  routga belgilangan vaqt ichida qancha request kelganini aniqlash imkonini beradi

        console.log(ipCount, routeCount);
        

        if (ipCount==1) {
            await redis.client.expire(ipKey, 60*60);
        }

        if (routeCount==1) {
            await redis.client.expire(routeKey, 60*60);
        }

        // minutiga 100 dan ortiq request bitta ip dan kelgan bo'lsa block ip lar listiga qo'shish
        // va qaysi vaqt oralig'ida blockga tushganini saqlab ketish
        const maxRequestsPerSecond = 100;
        if (maxRequestsPerSecond < ipCount) {
            await redis.set(`blockip::${request.ip}`, { time });
            return reply.status(401).send({ error: 'Blocked your IP' });
        }


    } catch (error) {
        return reply.status(401).send(CommonException.Unauthorized());
    }
}