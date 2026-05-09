import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  schedule!: string;

  @IsNumber()
  @Min(0)
  stock!: number;
}