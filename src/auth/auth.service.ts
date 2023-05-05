import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegistrationStatus } from "./interface/registration-status.interface";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginStatus } from "./interface/login-status.interface";
import { JwtPayload } from "./interface/payload.interface";
import { UserDto } from "../users/dto/user.dto";
import { UserCreateDto } from "../users/dto/user.create.dto";
import { UserLoginDto } from "../users/dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async register(userDto: UserCreateDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: "Inscription réussi"
    };
    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err.message
      };
    }

    return status;
  }

  async login(loginUserDto: UserLoginDto): Promise<LoginStatus> {
    // find user in db
    console.log(loginUserDto);
    const user = await this.usersService.findByLogin(loginUserDto);
    // generate and sign token
    const token = this._createToken(user);

    return {
      ...token
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload.username);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(user: UserDto): any {
    const expiresIn = "20m";

    const payload = { id: user.id, username: user.username, email: user.email };

    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn,
      accessToken
    };
  }
}