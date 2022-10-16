import { Exclude } from 'class-transformer';
import PrivateFile from 'src/entities/privateFile.entity';
import { Role } from 'src/utils/role.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import Address from './address.entity';
import PostEntity from './post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  @Exclude()
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public roles: Role;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files: PrivateFile[];

  @OneToOne(() => Address)
  @JoinColumn()
  public address: Address;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  public posts: PostEntity[];
}

export default User;
