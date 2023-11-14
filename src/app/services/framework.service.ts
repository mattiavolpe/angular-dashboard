import { Injectable } from '@angular/core';
import { SlugPipe } from '../pipes/slug.pipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  constructor(private slugPipe: SlugPipe, private router: Router) {}

  frameworks!: any[];
  frameworkLinks: any[] = [];
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

  createFrameworkLinkBase(frameworkId: string) {
    this.frameworkLinks.push(
      {
        frameworkId,
        links: []
      }
    );
  }

  redirectToFirstFramework() {
    this.router.navigate([`/framework/${this.slugPipe.transform(this.frameworks[0].name)}`]);
  }

  syncCurrentFrameworkLinks() {
    if (this.frameworkLinks.length === 0) {
      return [];
    } 

    return this.frameworkLinks.find(link => link.frameworkId === this.framework.id);
  }
}
