import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces';

export class PageMetaDto {
  //so trang
  @ApiProperty()
  readonly page: number;

  //so luong phan tu lay ra
  @ApiProperty()
  readonly take: number;

  //tong so phan tu cua mang
  @ApiProperty()
  readonly itemCount: number;

  //tong so trang
  @ApiProperty()
  readonly pageCount: number;

  //con trang phia truoc
  @ApiProperty()
  readonly hasPreviousPage: boolean;

  //con trang phia sau
  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
