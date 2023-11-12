import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug'
})
@Injectable({
  providedIn: 'root'
}) 
export class SlugPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/[^A-Za-z0-9@]/g, "-");
  }
}
