import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { TodosEntity } from "../todos/todos.entity";
@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  password: string;

  @Column({
    type: "varchar",
    nullable: false
  })

  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => TodosEntity, todo => todo.user)
  todos: TodosEntity[];

}
