import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtPayload } from "./interface/payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "juju-secret"
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    console.log("mon user", user);
    return {
      id: user.id,
      username: user.username,
      email : user.email
    };
  }
}