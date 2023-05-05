import { IsNotEmpty } from "class-validator";
import { UserDto } from "../../users/dto/user.dto";
import { CategoryDto } from "../../categories/dto/category.dto";

export class TodoCreateDto {

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  idCategory: number;
}