import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitle'
})
/**
 * Find items that have 'title' attribute and this value has some search text in it
 */
export class FilterByTitlePipe implements PipeTransform {

  transform(items: any[], text: string): any {
    if (!items || !text || items.length > 0 && !("title" in items[0])) {
      return items;
    }

    return items.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
  }

}
