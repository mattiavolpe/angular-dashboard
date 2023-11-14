import { HttpClient } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';
import { DeleteFrameworkComponent } from '../delete-framework/delete-framework.component';
import { EditFrameworkComponent } from '../edit-framework/edit-framework.component';

@Component({
  selector: 'app-framework-page',
  templateUrl: './framework-page.component.html',
  styleUrls: ['./framework-page.component.scss']
})
export class FrameworkPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, public frameworkService: FrameworkService, private dbService: DbService, private slugPipe: SlugPipe, private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  links!: { frameworkId: string, links: { linkId: string, linkName: string, linkUrl: string }[] };

  displayedColumns: string[] = ['name', 'url'];
  dataSource: any;

  ngOnInit(): void {
    // TODO try this
    // ELEMENT_DATA.forEach(element => {
    //   this.http.get(`https://getlinkpreview.onrender.com/?url=${element.name}`).subscribe({
    //     next: data => {
    //       console.log(data);
    //     },
    //     error: error => {
    //       console.log(error);
    //     }
    //   })
    // })
    
    if (!this.frameworkService.frameworks) {
      this.dbService.getFrameworks().subscribe({
        next: data => {
          if (!data)
            return;
          
          this.frameworkService.syncFrameworks(data);

          this.route.paramMap.subscribe((params: ParamMap) => {
            this.frameworkService.framework = this.frameworkService.frameworks.find(singleFramework => this.slugPipe.transform(singleFramework.name) === params.get("name"));
            
            if (this.frameworkService.framework) {
              this.links = this.frameworkService.syncCurrentFrameworkLinks();
              this.dataSource = this.links.links;
            }
              
            else
              this.router.navigate(["/404"]);
          });
        },
        error: error => console.error(error)
      });
    } else {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.frameworkService.framework = this.frameworkService.frameworks.find(singleFramework => this.slugPipe.transform(singleFramework.name) === params.get("name"));
        
        if (this.frameworkService.framework) {
          this.links = this.frameworkService.syncCurrentFrameworkLinks();
          this.dataSource = this.links.links;
        } else
          this.router.navigate(["/404"]);
      });
    }
  }

  openDialog(type: string, id: string, name: string, logo: string | null = null, website: string | null = null) {
    let dialogRef;
    switch(type) {
      case "edit":
        dialogRef = this.dialog.open(EditFrameworkComponent, { id: "editFrameworkDialog", data: { id, name, logo, website } });
        dialogRef.afterClosed().subscribe(() => {});
        break;
      
      case "delete":
        dialogRef = this.dialog.open(DeleteFrameworkComponent, { id: "deleteFrameworkDialog", data: { id, name } });
        dialogRef.afterClosed().subscribe(() => {});
        break;
    }
  };
}
