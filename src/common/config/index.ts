import { config } from 'dotenv';
config();

export const ENV = {
  IP: process.env.IP,
  ENVIRONMENT: process.env.ENVIRONMENT,
  REDIS: {
    URL: process.env.REDIS_URL,
    PASSWORD: process.env.REDIS_PASSWORD,
  },
  HTTP_HOST: process.env.HTTP_HOST,
  HTTP_PORT: Number(process.env.HTTP_PORT),
  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
  JWT_EXPIRE_ACCESS: process.env.JWT_EXPIRE_ACCESS,
  JWT_EXPIRE_REFRESH: process.env.JWT_EXPIRE_REFRESH,
  TIMEZONE: 'Asia/Tashkent',
};
