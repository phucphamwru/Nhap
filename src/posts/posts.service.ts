import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import PostEntity from 'src/entities/post.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Cache } from 'cache-manager';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_POSTS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async getAllPosts(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostEntity>> {
    // return this.postsRepository.find({ relations: ['author'] });
    const { page, take } = pageOptionsDto;
    const skip = (page - 1) * take;
    const queryBuilder = this.postsRepository.createQueryBuilder('post_entity');

    queryBuilder
      .leftJoinAndSelect('post_entity.author', 'user')
      .orderBy('post_entity.id', pageOptionsDto.order)
      .skip(skip)
      .take(take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(user: User, post: CreatePostDto) {
    const newPost = this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    await this.clearCache();
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (updatedPost) {
      await this.clearCache();
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    await this.clearCache();
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
