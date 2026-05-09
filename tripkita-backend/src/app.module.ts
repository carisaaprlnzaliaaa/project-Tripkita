import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { PackagesModule } from './packages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Sesuaikan dengan username pgAdmin Anda
      password: '090404', // Pastikan password ini benar
      database: 'tripkita_db',
      autoLoadEntities: true,
      synchronize: true, // Gunakan false di production
    }),
    AuthModule,
    UsersModule,
    PackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
