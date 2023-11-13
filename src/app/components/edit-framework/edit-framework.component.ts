import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DbService } from '../../services/db.service';
import { FrameworkService } from '../../services/framework.service';
import { Router } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';

@Component({
  selector: 'app-edit-framework',
  templateUrl: './edit-framework.component.html',
  styleUrls: ['./edit-framework.component.scss']
})
export class EditFrameworkComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, logo: string, docs: string }, private dialog: MatDialog, private dbService: DbService, private frameworkService: FrameworkService, private router: Router, private slugPipe: SlugPipe) {}

  editFramework(form: NgForm) {
    this.dbService.editFramework(this.data.id, form.value.name, form.value.logo, form.value.docs).subscribe({
      next: (editResponse: any) => {
        this.dialog.getDialogById("editFrameworkDialog")?.close();

        this.dbService.getFrameworks().subscribe({
          next: data => {
            this.frameworkService.syncFrameworks(data);

            this.frameworkService.framework = this.frameworkService.frameworks.find(singleFramework => singleFramework.name === editResponse.name);
            this.router.navigate([`/framework/${this.slugPipe.transform(editResponse.name)}`]);
          },
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }
}
