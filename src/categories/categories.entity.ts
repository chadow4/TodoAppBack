import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodosEntity } from "../todos/todos.entity";

@Entity()
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false
  })
  title: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => TodosEntity, todo => todo.category)
  todos: TodosEntity[];

}
