import { IsEmail, IsNotEmpty } from "class-validator";
import { TodoDto } from "../../todos/dto/todo.dto";

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  todos: TodoDto[];
}