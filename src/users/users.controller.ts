import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { UsersService } from './users.service';
import { Express, Response } from 'express';
import { FindOneParams } from 'src/utils/findOneParams';
import { CurrentUser } from '../utils/user.decorator';
import User from '../entities/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('files')
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
  async getPrivateFile(
    @CurrentUser() user: User,
    @Param() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    const file = await this.usersService.getPrivateFile(user.id, Number(id));
    file.stream.pipe(res);
  }

  @Get('files')
  async getAllPrivateFiles(@CurrentUser() user: User) {
    return this.usersService.getAllPrivateFiles(user.id);
  }

  @Post('files/send-mail-img/:id')
  async sendMailImg(@CurrentUser() user: User, @Param() { id }: FindOneParams) {
    return this.usersService.sendMailImg(user, Number(id));
  }
}
