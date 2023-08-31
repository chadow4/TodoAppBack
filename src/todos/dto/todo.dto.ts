import { IsNotEmpty } from "class-validator";
import { UserDto } from "../../users/dto/user.dto";
import { CategoryDto } from "../../categories/dto/category.dto";

export class TodoDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  finished: boolean;

  @IsNotEmpty()
  desiredEndDate: Date;

  @IsNotEmpty()
  createdAt: Date;
  user : UserDto;
  category: CategoryDto;
}