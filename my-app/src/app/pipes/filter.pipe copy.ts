import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/app.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  constructor() {}

  transform(value: Course[], searchParam: string): Course[] {
    if (!value) {
      value = [];
    }
    return value.filter((item) => {
      return item.title.toLowerCase().startsWith(searchParam.toLowerCase());
    });
  }
}
