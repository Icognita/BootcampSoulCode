import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }    
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.texto.toLocaleLowerCase().includes(searchText) || it.nome.toLocaleLowerCase().includes(searchText);
    });
  }
}
