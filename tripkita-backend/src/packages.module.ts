import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourPackage } from './package.entity';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TourPackage]), AuthModule],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}