import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CryptoModule } from '../crypto/crypto.module';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, CryptoModule]
})
export class AuthModule {}
