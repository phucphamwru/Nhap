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
  Query,
  UseInterceptors,
  // CacheInterceptor,
  CacheKey,
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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos';
import { HttpCacheInterceptor } from './httpCache.interceptor';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(Role.User)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseInterceptors(CacheInterceptor)   - Auto-caching responses
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @Get()
  async getAllPosts(@Query() pageOptionsDto: PageOptionsDto) {
    return this.postsService.getAllPosts(pageOptionsDto);
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
