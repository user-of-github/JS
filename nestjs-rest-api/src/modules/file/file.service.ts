import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import { CryptoService } from '../utils/crypto.service';


@Injectable()
export class FileService {
  private static readonly StaticPath = path.resolve(__dirname, '..', 'static');

  public constructor(private readonly cryptoService: CryptoService) {

  }

  public async createFile(file: any): Promise<string> {
    try {
      const name = this.cryptoService.generateUUID() + '.jpg';

      if (!fs.existsSync(FileService.StaticPath)) {
        await fs.promises.mkdir(FileService.StaticPath, { recursive: true });
      }

      await fs.promises.writeFile(path.join(FileService.StaticPath, name), file.buffer)

      return name;
    } catch {
      throw new InternalServerErrorException('An error while saving a file image occurred')
    }
  }
}
