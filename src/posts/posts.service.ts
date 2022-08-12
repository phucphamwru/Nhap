import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import PostEntity from 'src/entities/post.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PostEntity>> {
    // return this.postsRepository.find({ relations: ['author'] });
    const { page, skip, take } = pageOptionsDto;
    console.log('page: ', page);
    console.log('skip: ', skip);
    console.log('take: ', take);
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
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
