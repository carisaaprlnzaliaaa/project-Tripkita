import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourPackage } from './package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(TourPackage)
    private packageRepository: Repository<TourPackage>,
  ) {}

  // Untuk Admin & User
  async findAll(): Promise<TourPackage[]> {
    return this.packageRepository.find();
  }

  async findOne(id: number): Promise<TourPackage> {
    const pkg = await this.packageRepository.findOne({ where: { id } });
    if (!pkg) throw new NotFoundException('Paket tidak ditemukan');
    return pkg;
  }

  // Untuk Admin
  create(data: Partial<TourPackage>) {
    const newPackage = this.packageRepository.create(data);
    return this.packageRepository.save(newPackage);
  }

  async remove(id: number) {
    const result = await this.packageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Paket dengan ID ${id} tidak ditemukan`);
    }
    return { message: 'Paket berhasil dihapus' };
  }
}