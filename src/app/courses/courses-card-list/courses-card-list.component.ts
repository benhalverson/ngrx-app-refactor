import { NgFor } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  MatButton,
  MatMiniFabButton,
} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import {
  EditCourseDialogComponent,
} from "../edit-course-dialog/edit-course-dialog.component";
import { Course } from "../model/course";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: true,
    imports: [NgFor, MatCard, MatCardHeader, MatCardTitle, MatCardImage, MatCardContent, MatCardActions, MatButton, RouterLink, MatMiniFabButton, MatIcon]
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[] | null = [];

    @Output()
    courseChanged = new EventEmitter();

    constructor(
      private dialog: MatDialog ) {
    }

    ngOnInit() {
      const userProfile = localStorage.getItem('user');
      console.log('userProfile', userProfile);

    }

    editCourse(course:Course) {

        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
          dialogTitle:"Edit Course",
          course,
          mode: 'update'
        };

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
          .afterClosed()
          .subscribe(() => this.courseChanged.emit());

    }

  onDeleteCourse(course:Course) {


  }

}









