import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../../services/db.service';
import { FrameworkService } from '../../services/framework.service';
import { Router } from '@angular/router';
import { SlugPipe } from 'src/app/pipes/slug.pipe';

@Component({
  selector: 'app-create-framework',
  templateUrl: './create-framework.component.html',
  styleUrls: ['./create-framework.component.scss']
})
export class CreateFrameworkComponent {
  constructor(private dialog: MatDialog, private dbService: DbService, private frameworkService: FrameworkService, private router: Router, private slugPipe: SlugPipe) {}

  createFramework(form: NgForm) {
    this.dbService.saveFramework(form.value.name, form.value.logo, form.value.docs).subscribe({
      next: () => {
        this.dialog.getDialogById("createFrameworkDialog")?.close();

        this.dbService.getFrameworks().subscribe({
          next: data => {
            this.frameworkService.syncFrameworks(data);
            this.router.navigate([`/framework/${this.slugPipe.transform(this.frameworkService.frameworks[this.frameworkService.frameworks.length - 1].name)}`]);
          },
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }
}
