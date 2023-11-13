import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DbService } from '../../services/db.service';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'app-edit-framework',
  templateUrl: './edit-framework.component.html',
  styleUrls: ['./edit-framework.component.scss']
})
export class EditFrameworkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, logo: string, docs: string }, private dialog: MatDialog, private dbService: DbService, private frameworkService: FrameworkService) {}

  editFramework(form: NgForm) {
    this.dbService.editFramework(this.data.id, form.value.name, form.value.logo, form.value.docs).subscribe({
      next: () => {
        this.dialog.getDialogById("editFrameworkDialog")?.close();

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
