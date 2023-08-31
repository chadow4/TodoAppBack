import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { CategoriesEntity } from "../categories/categories.entity";
import { TodoCreateDto } from "./dto/todo.create.dto";
import { TodoDto } from "./dto/todo.dto";
import { TodosEntity } from "./todos.entity";
import { toTodoDto } from "../shared/mapper";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(TodosEntity)
    private readonly todosRepository: Repository<TodosEntity>
  ) {
  }

  async createTodo(todo: TodoCreateDto, idUser: number): Promise<TodoDto> {
    if (!todo.content || !todo.desiredEndDate || !idUser || !todo.idCategory) {
      throw new HttpException("Arguments manquants", HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findOne({ where: { id: idUser } });
    const category = await this.categoriesRepository.findOne({ where: { id: todo.idCategory } });

    if (!user) {
      throw new HttpException(
        "L'utilisateur n'a pas été trouvé",
        HttpStatus.NOT_FOUND
      );
    }

    if (!category) {
      throw new HttpException(
        "La catégorie n'a pas été trouvé",
        HttpStatus.NOT_FOUND
      );
    }
    const createTodo = this.todosRepository.create(
      {
        content: todo.content,
        desiredEndDate: todo.desiredEndDate,
        user : user,
        category :category
      }
    );

    try {
      await this.todosRepository.save(createTodo);
      return toTodoDto(createTodo);

    } catch (error) {
      throw new HttpException("Erreur de la sauvegarde de la tâche", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setFinishedTodo(id: number, idUser: number): Promise<TodoDto> {
    const todo = await this.todosRepository.findOne({ where: { id }, relations: ["user"] });
    if (!todo) {
      throw new HttpException("La Todo n'a pas été trouvée", HttpStatus.NOT_FOUND);
    }
    if (todo.user.id !== idUser) {
      throw new HttpException("La Todo n'est pas dans la liste des Todos de l'utilisateur", HttpStatus.UNAUTHORIZED);
    }

    if(todo.finished){
      todo.finished = false;
    }else{
      todo.finished = true;
    }

    try {
      return toTodoDto(await this.todosRepository.save(todo));
    } catch (error) {
      throw new HttpException("Erreur, votre todo n'a pas pu changer d'état", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}