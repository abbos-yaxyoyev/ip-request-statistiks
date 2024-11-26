import fp from 'fastify-plugin';
import { CommonException } from '../errors';
import { StatusCodes } from '../constant/status-codes';
import { ValidationError } from 'class-validator';

export const replyDecorator = fp(function pl(instance, options, next) {
  instance.decorateReply('success', function (data: any = 'ok', count = undefined) {
    let response = CommonException.Success(data);
    if ( count >=0 ) response.count = count;
    this.status(200).send(response);
  });

  instance.setErrorHandler((error, _request, response) => {
    console.error(
      "================================ GLOBAL ERROR HANDLER =================================\n",
      error,
    );
  
    if (error instanceof ValidationError) return response.status(404).send(CommonException.ValidationError(error.message));
    if (error.hasOwnProperty('code') && error['time'] && error.hasOwnProperty('success')) return response.status(StatusCodes.BAD_REQUEST).send(error);
    
    return response.status(StatusCodes.BAD_REQUEST).send(CommonException.UnknownError(error.message));

  });

  next();
});
