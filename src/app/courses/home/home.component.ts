import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable, of} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay,} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [MatMiniFabButton, MatIcon, NgIf, MatProgressSpinner, MatTabGroup, MatTab, CoursesCardListComponent, AsyncPipe]
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number> = of(0);

    loading$: Observable<boolean> = of(false);

    beginnerCourses$!: Observable<Course[]>;

    advancedCourses$!: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private coursesHttpService: CoursesHttpService) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

    const courses$ = this.coursesHttpService.findAllCourses()
      .pipe(
        map(courses => courses.sort(compareCourses)),
        shareReplay()
      );

    this.loading$ = courses$.pipe(map(courses => !!courses));

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      );


    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      );

    this.promoTotal$ = courses$
        .pipe(
            map(courses => courses.filter(course => course.promo).length)
        );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
