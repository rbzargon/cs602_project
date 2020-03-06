import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseFloatPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    return parseFloat(value);
  }
}