import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './user.entity';
import { TourPackage } from './package.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreatePackageDto } from './packages.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  // Publik: Siapa saja bisa melihat daftar paket
  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(+id);
  }

  // Admin Only: Hanya admin yang bisa menambah paket
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() packageData: CreatePackageDto) {
    return await this.packagesService.create(packageData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.packagesService.remove(+id);
  }
}