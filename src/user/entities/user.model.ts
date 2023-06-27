import { hashSync } from "bcrypt";
import { BeforeCreate, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Note } from "src/note/entities/note.model";

@Table
export class User extends Model {
  @Column({ allowNull: false, primaryKey: true })
  id: string;

  @Column({ unique: true, allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column
  name: string;

  @Column
  avatar: string;

  @HasMany(() => Note)
  notes: Note[]

  @BeforeCreate
  static hashPassword(user: User) {
    user.password = hashSync(user.password, 10);
  }
}