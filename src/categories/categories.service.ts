import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoriesEntity } from "./categories.entity";
import { CategoryDto } from "./dto/category.dto";
import { toCategoryDto } from "../shared/mapper";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {
  }

  async getAllCategories(): Promise<void | CategoryDto[]> {
    const articles = await this.categoriesRepository.find();
    return articles.map(category => toCategoryDto(category));
  }


}