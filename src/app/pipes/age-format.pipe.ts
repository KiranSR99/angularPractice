import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return value + " year";
    } else {
      return value + " years";
    }
  }

}
