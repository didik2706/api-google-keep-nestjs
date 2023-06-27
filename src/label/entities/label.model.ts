import { BelongsToMany, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Note } from "src/note/entities/note.model";
import { User } from "src/user/entities/user.model";
import { NoteLabel } from "./labelNote.model";

@Table
export class Label extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: string;

  @Column({ allowNull: false })
  name: string;

  @BelongsToMany(() => Note, () => NoteLabel)
  notes: Note[]
}