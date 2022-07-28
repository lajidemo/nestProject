import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()

    console.log('exception.message===',exception)
    const message = exception.message?  exception.message : `${status>=500? 'Service Error' : 'Client Error'}`
    const errorResponse = {
      data: null,
      message,
      code: -1
    }

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
