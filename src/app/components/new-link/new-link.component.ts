import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.scss']
})
export class NewLinkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { frameworkId: string | any }, private dialog: MatDialog, private dbService: DbService, private frameworkService: FrameworkService, private router: Router, private slugPipe: SlugPipe) {}

  framework = this.frameworkService.frameworks.find(framework => framework.id === this.data.frameworkId);

  newLink(form: NgForm) {
    this.dbService.createLink(this.framework.id, form.value.name, form.value.link).subscribe({
      next: () => {
        this.dialog.getDialogById("newLinkDialog")?.close();

        this.dbService.getFrameworkLinks(this.framework.id).subscribe(linksData => {
          const originalFrameworkLinks = this.frameworkService.frameworkLinks.find(links => links.frameworkId === this.framework.id);
          
          originalFrameworkLinks.links = Object.entries(linksData).map(entry => {
            return {
              linkId: entry[0],
              linkName: entry[1].name,
              linkUrl: entry[1].link
            }
          });
        });

        this.router.navigate([`/framework/${this.slugPipe.transform(this.framework.name)}`]);
      },
      error: error => console.error(error)
    });
  }
}
