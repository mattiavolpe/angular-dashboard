import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  constructor() { }

  frameworks!: any[];
}
