import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.model";
import { NoteImage } from "./note_image.model";
import { Label } from "src/label/entities/label.model";
import { NoteLabel } from "src/label/entities/labelNote.model";

@Table
export class Note extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  user_id: string;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  content: string;

  @HasMany(() => NoteImage)
  images: NoteImage[];

  @BelongsToMany(() => Label, () => NoteLabel)
  labels: Label[]
}