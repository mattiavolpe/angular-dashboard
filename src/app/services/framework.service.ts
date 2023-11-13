import { Injectable } from '@angular/core';
import { SlugPipe } from '../pipes/slug.pipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  constructor(private slugPipe: SlugPipe, private router: Router) { }

  frameworks!: any[];
  framework!: any;

  syncFrameworks(data: Object) {
    this.frameworks = Object.entries(data).map(framework => {
      return {
        id: framework[0],
        name: framework[1].name,
        logo: framework[1].logo,
        website: framework[1].website
      }
    });
  }

  redirectToFirstFramework() {
    this.router.navigate([`/framework/${this.slugPipe.transform(this.frameworks[0].name)}`]);
  }
}
