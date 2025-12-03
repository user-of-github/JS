import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { Injectable } from '@nestjs/common';

const scryptAsync = promisify<string, string, number, Buffer>(crypto.scrypt);


@Injectable()
export class CryptoService {
  private static readonly defaultSalt: string = 'Ks8f7n2Qw9Lm4pZx';
  private static readonly keyLength: number = 64;

  public async hash(source: string, salt?: string) {
    const usedSalt = salt ? salt : CryptoService.defaultSalt;
    console.log('USED SALT', usedSalt)
    const buf = await scryptAsync(source, usedSalt, CryptoService.keyLength);

    return `${usedSalt}:${buf.toString('hex')}`;
  }

  public async verify(source: string, storedHash: string) {
    const [salt, hash] = storedHash.split(':');
    const buf = await scryptAsync(source, salt, CryptoService.keyLength);

    return hash === buf.toString('hex');
  }

  private generateSalt() {
    return crypto.randomBytes(16).toString('hex');
  }
}
