import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./users/users.entity";
import { TodosEntity } from "./todos/todos.entity";
import { CategoriesEntity } from './categories/categories.entity';
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todoapp",
    entities: [UsersEntity,TodosEntity,CategoriesEntity],
    synchronize: true
  }),
    CategoriesModule,
    UsersModule,
    TodosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
