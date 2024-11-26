import moment from 'moment';
import { Redis, redis } from '../redise/connection';


class UserService {

    private redis: Redis

    constructor() {
        this.redis = redis
    }

    async register(data) {
        try {

            return 'OK';

        } catch (error) {
            throw error
        }
    }


    async getStatisticsByIP(ip: string) {
        try {

            const keys = await this.redis.client.keys(`stats:ip::${ip}*`);

            const currentTime = moment();
            const oneHourAgo = moment().subtract(1, 'hour'); // bu yerda so'ngi bir soatdagi resultni olish  yoki istalgan vaqt oralig'ini bersa bo'ladi

            const filteredKeys = keys.filter((key) => {

                const [, ip, timestamp] = key.split('::');
                const time = moment(timestamp);

                return time.isBetween(oneHourAgo, currentTime, 'second', '[)');
            })

            const results: { ip: string, time: string, count: number }[] = [];
            let totalCount = 0;
            for (const key of filteredKeys) {

                const count = parseInt(await redis.get(key), 10);
                totalCount += count;

                const [, , ip, time] = key.split('::');
                results.push({ ip, time, count })

            }


            results.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
            return { totalCount, results };

        } catch (error) {
            throw error
        }
    }

    async getStatisticsByRoute(route: string) {
        try {

            const keys = await this.redis.client.keys(`stats:route::${route}*`);

            const currentTime = moment();
            const oneHourAgo = moment().subtract(1, 'hour'); // bu yerda so'ngi bir soatdagi resultni olish  yoki istalgan vaqt oralig'ini bersa bo'ladi

            const filteredKeys = keys.filter((key) => {

                const [_, r, ip, timestamp] = key.split('::');
                const time = moment(timestamp);

                return time.isBetween(oneHourAgo, currentTime, 'second', '[)');
            })

            let obj: { [key: string]: number } = {};
            for (const key of filteredKeys) {

                const count = parseInt(await redis.get(key), 10);
                const [_, r, ip, time] = key.split('::');

                if (obj[`${r}::${time}`])
                    obj[`${r}::${time}`] += count;
                else
                    obj[`${r}::${time}`] = count;


            }


            const results: { route: string, time: string, count: number }[] = [];
            let totalCount = 0;
            for (const key of Object.keys(obj)) {

                totalCount += obj[key];
                console.log(222, key.split('::'));

                const [r, time] = key.split('::');
                console.log(key.split('::'));
                results.push({ route: r, time, count: obj[key] })

            }


            results.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
            return { totalCount, results };

        } catch (error) {
            throw error
        }
    }

}

export const userService = new UserService();