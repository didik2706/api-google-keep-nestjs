import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Note } from "src/note/entities/note.model";
import { Label } from "./label.model";

@Table
export class NoteLabel extends Model {
  @ForeignKey(() => Note)
  @Column({ allowNull: false })
  note_id: number

  @ForeignKey(() => Label)
  @Column({ allowNull: false })
  label_id: number
}