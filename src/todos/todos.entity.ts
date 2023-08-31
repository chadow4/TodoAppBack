import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { UsersEntity } from "../users/users.entity";
import { CategoriesEntity } from "../categories/categories.entity";
@Entity()
export class TodosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  content: string;

  @Column({ type: 'boolean', default: false })
  finished: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "timestamp",default: null })
  desiredEndDate: Date;

  @ManyToOne(() => UsersEntity, user => user.todos)
  user: UsersEntity;

  @ManyToOne(() => CategoriesEntity, category => category.todos)
  category: CategoriesEntity;

}
