import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nepaliFont'
})
export class NepaliFontPipe implements PipeTransform {

  englishToNepaliDigits: { [key: string]: string } = {
    '0': '०',
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९'
  };

  transform(value: number): string {
    const valueAsString: string = value.toString();
    let result = '';

    for (let i = 0; i < valueAsString.length; i++) {
      const char = valueAsString.charAt(i);
      result += this.englishToNepaliDigits[char] || char;
    }

    return result;
  }

}
