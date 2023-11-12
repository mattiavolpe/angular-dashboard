import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},

];

@Component({
  selector: 'app-framework-page',
  templateUrl: './framework-page.component.html',
  styleUrls: ['./framework-page.component.scss']
})
export class FrameworkPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private frameworkService: FrameworkService, private dbService: DbService, private slugPipe: SlugPipe) {}

  framework!: any;

  ngOnInit(): void {
    if (!this.frameworkService.frameworks) {
      this.dbService.getFrameworks().subscribe({
        next: data => {
          if (!data)
            return;
          
          this.frameworkService.syncFrameworks(data);

          this.route.paramMap.subscribe((params: ParamMap) => {
            this.framework = this.frameworkService.frameworks.find(singleFramework => this.slugPipe.transform(singleFramework.name) === params.get("name"));
          });
        },
        error: error => console.error(error)
      });
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.framework = this.frameworkService.frameworks.find(singleFramework => this.slugPipe.transform(singleFramework.name) === params.get("name"));
      });
    }
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
