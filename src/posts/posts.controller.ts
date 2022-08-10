import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindOneParams } from 'src/utils/findOneParams';
import { Roles } from 'src/utils/roles.decorator';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { Role } from 'src/utils/role.enum';
import { CurrentUser } from 'src/utils/user.decorator';
import User from 'src/entities/user.entity';
import { RolesGuard } from 'src/utils/roles.guard';

@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(Role.User)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@CurrentUser() user: User, @Body() post: CreatePostDto) {
    return this.postsService.createPost(user, post);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
