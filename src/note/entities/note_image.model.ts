import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import { Note } from "./note.model";

@Table
export class NoteImage extends Model {
  @ForeignKey(() => Note)
  @Column({ allowNull: false })
  note_id: number;

  @Column({ allowNull: false })
  path: string;
}