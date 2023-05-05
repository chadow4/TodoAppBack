import { IsNotEmpty } from "class-validator";
import { TodoDto } from "../../todos/dto/todo.dto";

export class CategoryDto {

  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  title: string;

  todos: TodoDto[];
}