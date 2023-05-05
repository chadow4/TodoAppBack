import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "./categories.entity";
import { AuthModule } from "../auth/auth.module";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: []
})
export class CategoriesModule {
}