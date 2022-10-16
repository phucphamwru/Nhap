<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



- useFactory :  syntax allows for creating providers dynamically.
  -> use with 'env' : change env -> Service change.





response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });



- The most straightforward way to handle PATCH is to pass  'skipMissingProperties'
- Patch: chi thay doi 1 phan cua object
- Put: cap nhat toan bo cua object

- Pipe : la nhung data (dto) hop le khi clien day len server.
- Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer.
- When an exception is thrown in a Pipe, no controller method is subsequently executed.


- But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the next() function. 
-> Guards have access to the ExecutionContext instance, and thus know exactly what's going to be executed next. 

# Guards are executed after all middleware, but before any interceptor or pipe.
- Every guard must implement a canActivate() function


# File
- FileInterceptor('file')   : FileInterceptor de define ten bien 'file' cung request file len server.
  (@UploadedFile() file: Express.Multer.File)
- :use @UploadedFile() de trich xuat file tu request

- Ex:
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

# @SetMetadata('roles', ['admin'])
- roles is a metadata key
- ['admin'] is the associated value

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

- Read the handler metadata = Reflector class.
const roles = this.reflector.get<string[]>('roles', context.getHandler());


# string -> date:	Date(<string>)

# date -> string: 	Date(...).toString()



# Caching acts as a temporary data store providing high performance data access.
- Nest provides a unified API for various cache storage providers. The built-in one is an in-memory data store.
- De tuong tac voi Cache 0 -> Inject(CACHE_MANAGER) vao class cua minh.
  ex: constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
- get() method tu Cach instance dung de lay cac muc tu bo nho Cache.
  ex: const value = await this.cacheManager.get('key');

- set() method la add them item vao bo nho Cache.
  ex: await this.cacheManager.set('key', 'value');

- del() method la remove xoa item trong bo nho Cache.
  ex: await this.cacheManager.del('key');

- reset() method la xoa toan bo item trong Cache.
  ex: await this.cacheManager.reset();

- The default expiration time of the cache is 5 seconds.
You can manually specify a TTL (expiration time in seconds) for this specific key, as follows:
  ex: await this.cacheManager.set('key', 'value', { ttl: 10000 });

# NestJS will store the response of the getPosts method separately for every combination of query params.

- Redis dc sinh ra de giai quyet nhung van de ton tai trong Cache Memory
  + Applications often run multiple instances of our API 
  ->  the incoming traffic is load-balanced and redirected to multiple instances.
  -> keeping the cache within the memory of the application means that multiple instances of our API do not share the same cache
  -> restarting the API means losing the cache.