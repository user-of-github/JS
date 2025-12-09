import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';
import { promisify } from 'node:util';


const nodeScryptAsync = promisify<crypto.BinaryLike, crypto.BinaryLike, number, Buffer>(crypto.scrypt);


@Injectable()
export class CryptoService {
  private static readonly KeyLength = 64;

  public async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = await nodeScryptAsync(password, salt, CryptoService.KeyLength);
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  public async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [salt, key] = storedHash.split(':');

    if (!salt || !key) {
        return false;
    }

    const derivedKeyBuffer = await nodeScryptAsync(password, salt, CryptoService.KeyLength);
    const keyBuffer = Buffer.from(key, 'hex');

    return crypto.timingSafeEqual(derivedKeyBuffer, keyBuffer);
  }
}
