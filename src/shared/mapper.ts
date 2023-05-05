import { UserDto } from "../users/dto/user.dto";
import { UsersEntity } from "../users/users.entity";
import { TodosEntity } from "../todos/todos.entity";
import { TodoDto } from "../todos/dto/todo.dto";
import { CategoriesEntity } from "../categories/categories.entity";
import { CategoryDto } from "../categories/dto/category.dto";


export const toUserDto = (data: UsersEntity): UserDto => {
  const { id, username, email, todos} = data;

  let userDto: UserDto = {
    id,
    username,
    email,
    todos: todos?.map((todo: TodosEntity) => toTodoDto(todo)),
  };
  return userDto;


};

export const toTodoDto = (data: TodosEntity): TodoDto => {
  const { id, content, finished, createdAt, user, category } = data;

  let todoDto: TodoDto = {
    id,
    content,
    finished,
    createdAt,
    user: user && toUserDto(user),
    category: category && toCategoryDto(category),
  };

  return todoDto;
};


export const toCategoryDto = (data: CategoriesEntity): CategoryDto => {
  const {id,title, todos} = data;

  let categoryDto: CategoryDto = {
    id,
    title,
    todos: todos?.map((todo: TodosEntity) => toTodoDto(todo)),
  };

  return categoryDto;
};