import { HttpStatus } from '@nestjs/common';

export interface ICustomResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data?: T;
}
