import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseTitle'
})
export class UpperCaseTitlePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value.toUpperCase();
  }
}