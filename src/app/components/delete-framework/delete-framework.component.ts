import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-delete-framework',
  templateUrl: './delete-framework.component.html',
  styleUrls: ['./delete-framework.component.scss']
})
export class DeleteFrameworkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string }, private dbService: DbService, private dialog: MatDialog, private frameworkService: FrameworkService, private router: Router) {}

  deleteFramework() {
    this.dbService.deleteFramework(this.data.id).subscribe({
      next: () => {
        this.dialog.getDialogById("deleteFrameworkDialog")?.close();

        const linksToRemove = this.frameworkService.frameworkLinks.filter(link => link.frameworkId === this.data.id)[0].links;
        
        linksToRemove.forEach((link: any) => this.dbService.deleteLink(link.linkId).subscribe());

        this.dbService.getFrameworks().subscribe({
          next: data => {
            if (!data) {
              this.router.navigate(["/"]);
              return;
            }

            this.frameworkService.syncFrameworks(data);
            this.frameworkService.redirectToFirstFramework();
          },
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }
}
