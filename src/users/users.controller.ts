import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get("infos")
  @UseGuards(AuthGuard("jwt"))
  async getUserInformation(@Request() req) {
    try {
      return await this.usersService.getUserInformation(req.user.id);
    } catch (error) {
      throw error;
    }
  }
}