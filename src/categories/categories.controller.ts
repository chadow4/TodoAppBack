import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))

  async getAllCategories() {
    try {
      return await this.categoriesService.getAllCategories();
    } catch (error) {
      throw error;
    }
  }
}