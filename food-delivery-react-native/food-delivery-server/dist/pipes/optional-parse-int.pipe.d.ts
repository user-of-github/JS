import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class OptionalParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number | undefined;
}
