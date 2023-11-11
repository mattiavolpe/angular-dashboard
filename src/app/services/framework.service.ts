import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  constructor() { }

  frameworks!: any[];

  syncFrameworks(data: Object) {
    this.frameworks = Object.entries(data).map(framework => {
      return {
        id: framework[0],
        name: framework[1].name
      }
    });
  }
}
