import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../services/db.service';
import { FrameworkService } from '../services/framework.service';

@Component({
  selector: 'app-create-framework',
  templateUrl: './create-framework.component.html',
  styleUrls: ['./create-framework.component.scss']
})
export class CreateFrameworkComponent {
  constructor(private dialog: MatDialog, private dbService: DbService, private frameworkService: FrameworkService) {}

  createFramework(form: NgForm) {
    this.dbService.saveFramework(form.value.name).subscribe({
      next: () => {
        this.dialog.getDialogById("createFrameworkDialog")?.close();

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
