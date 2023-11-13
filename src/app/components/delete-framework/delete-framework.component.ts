import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-delete-framework',
  templateUrl: './delete-framework.component.html',
  styleUrls: ['./delete-framework.component.scss']
})
export class DeleteFrameworkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string }, private dbService: DbService, private dialog: MatDialog, private frameworkService: FrameworkService) {
  }

  deleteFramework() {
    this.dbService.deleteFramework(this.data.id).subscribe({
      next: () => {
        this.dialog.getDialogById("deleteFrameworkDialog")?.close();

        this.dbService.getFrameworks().subscribe({
          next: data => {
            this.frameworkService.syncFrameworks(data);
          },
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }
}
