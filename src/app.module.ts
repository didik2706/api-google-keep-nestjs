import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.model';
import { NoteModule } from './note/note.module';
import { LabelModule } from './label/label.module';
import { Note } from './note/entities/note.model';
import { NoteImage } from './note/entities/note_image.model';
import { Label } from './label/entities/label.model';
import { NoteLabel } from './label/entities/labelNote.model';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Note, NoteImage, Label, NoteLabel],
      autoLoadModels: true,
      logging: false
    }),
    AuthModule,
    UserModule,
    NoteModule,
    LabelModule
  ]
})
export class AppModule {}
