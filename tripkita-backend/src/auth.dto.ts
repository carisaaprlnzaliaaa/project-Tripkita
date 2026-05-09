import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from './user.entity';

export class RegisterDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password!: string;

  @IsEnum(UserRole, { message: 'Role harus admin atau customer' })
  role!: UserRole;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}