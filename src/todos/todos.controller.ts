import { Body, Controller, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { AuthGuard } from "@nestjs/passport";
import { TodoCreateDto } from "./dto/todo.create.dto";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createTodo(@Body() todoCreateDto: TodoCreateDto, @Request() req) {
    try {
      return await this.todosService.createTodo(todoCreateDto, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async setFinished(@Param("id",) id: number,@Request() req) {
    try {
      return await this.todosService.setFinishedTodo(id,req.user.id);
    } catch (error) {
      throw error;
    }
  }

}