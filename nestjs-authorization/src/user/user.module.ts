import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoModule } from 'src/crypto/crypto.module';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CryptoModule],
  exports: [UserService]
})
export class UserModule {}
