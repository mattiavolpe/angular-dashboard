import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-delete-link',
  templateUrl: './delete-link.component.html',
  styleUrls: ['./delete-link.component.scss']
})
export class DeleteLinkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string }, private dbService: DbService, private dialog: MatDialog, private frameworkService: FrameworkService) {}

  deleteLink() {
    this.dbService.deleteLink(this.data.id).subscribe({
      next: () => {
        this.dbService.getFrameworkLinks(this.frameworkService.framework.id).subscribe(linksData => {
          const originalFrameworkLinks = this.frameworkService.frameworkLinks.find(links => links.frameworkId === this.frameworkService.framework.id);
          
          
          originalFrameworkLinks.links = Object.entries(linksData).map(entry => {
            return {
              linkId: entry[0],
              linkName: entry[1].name,
              linkUrl: entry[1].link
            }
          });

          this.dialog.getDialogById("deleteLinkDialog")?.close(originalFrameworkLinks!.links || []);
        });
      },
      error: error => console.error(error)
    });
  }
}
