import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export class OptionalParseIntPipe implements PipeTransform {
  public transform(value: any, metadata: ArgumentMetadata): number | undefined {
    if (!value) {
      return undefined;
    }

    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      return undefined;
    }

    return parsedValue;
  }
}
