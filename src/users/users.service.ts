import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { UserDto } from "./dto/user.dto";
import { toUserDto } from "../shared/mapper";
import * as bcrypt from "bcrypt";
import { UserCreateDto } from "./dto/user.create.dto";
import { UserLoginDto } from "./dto/user-login.dto";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity> // user Repository
  ) {
  }

  async showAll(): Promise<void | UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map(user => toUserDto(user));
  }

  async create(data: UserCreateDto): Promise<UserDto> {
    console.log(data);
    if (!data.username || !data.email || !data.password) {
      throw new HttpException("des champs sont manquants", HttpStatus.BAD_REQUEST);
    }
    const existingUser = await this.usersRepository.findOne({ where: { username: data.username } });
    if (existingUser) {
      throw new HttpException("L'utilisateur existe déjà", HttpStatus.CONFLICT);
    }
    const user = await this.usersRepository.create(data);
    try {
      await this.usersRepository.save(user);
      return toUserDto(user);
    } catch (error) {
      throw new HttpException("Erreur lors de la création de l'utilisateur", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByPayload(username: string): Promise<UserDto> {
    return await this.findOne({
      where: { username }
    });
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.usersRepository.findOne(options);
    if (!user) {
      throw new HttpException("Utilisateur non trouvé", HttpStatus.NOT_FOUND);
    }
    return toUserDto(user);
  }

  async findByLogin({ username, password }: UserLoginDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException("L'utilisateur n'existe pas", HttpStatus.NOT_FOUND);
    }
    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException("Mauvais mot de passe", HttpStatus.BAD_REQUEST);
    }

    return toUserDto(user);
  }


  async getUserInformation(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["todos", "todos.category"]

    });
    if (!user) {
      throw new HttpException("L'utilisateur n'a pas était trouvé", HttpStatus.NOT_FOUND);
    }
    return toUserDto(user);
  }

}