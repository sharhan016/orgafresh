import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'myPipe',
})
export class MyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: boolean, ...args) {
    return 'https://market.orgafreshonline.in/storage/files/' + value;
  }
}
