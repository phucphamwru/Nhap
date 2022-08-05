import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { UsersService } from './users.service';
import { Express } from 'express';
import { FindOneParams } from 'src/utils/findOneParams';
import { Response } from 'express';
import { CurrentUser } from '../utils/user.decorator';
import User from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFile(
    @CurrentUser() user: User,
    @Param() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    const file = await this.usersService.getPrivateFile(user.id, Number(id));
    file.stream.pipe(res);
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@CurrentUser() user: User) {
    return this.usersService.getAllPrivateFiles(user.id);
  }

  @Post('files/send-mail-img/:id')
  @UseGuards(JwtAuthenticationGuard)
  async sendMailImg(@CurrentUser() user: User, @Param() { id }: FindOneParams) {
    return this.usersService.sendMailImg(user, Number(id));
  }
}
