import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExerciseEditFormComponent } from './exercise-edit-form/exercise-edit-form.component';
import { Exercise, ExerciseGroup } from './exercise.model';
import { CreateExerciseGroup, GetAllExerciseGroups, GetAllExercises } from './store/exercise.actions';
import { ExerciseState } from './store/exercise.state';

@Component({
  selector: 'progress-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  @Select(ExerciseState.exerciseGroups) exerciseGroups$: Observable<ExerciseGroup[]>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllExerciseGroups());
    this.store.dispatch(new GetAllExercises());
  }

  createExerciseGroup() {
    this.store.dispatch(new CreateExerciseGroup({ name: 'Neue Übungsgruppe' }));
  }
}
