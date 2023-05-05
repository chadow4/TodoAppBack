import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodosEntity } from "./todos.entity";
import { UsersEntity } from "../users/users.entity";
import { CategoriesEntity } from "../categories/categories.entity";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity, UsersEntity, CategoriesEntity])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: []
})
export class TodosModule {
}