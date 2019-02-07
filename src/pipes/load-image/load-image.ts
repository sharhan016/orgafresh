import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LoadImagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'loadImage',
})
export class LoadImagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: boolean, ...args) {
    return 'https://market.orgafreshonline.in/storage/files/' + value;
  }
}
