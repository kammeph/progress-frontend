import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { ExerciseEditFormComponent } from '../exercise-edit-form/exercise-edit-form.component';
import { Exercise, ExerciseGroup } from '../exercise.model';
import {
  CreateExerciseGroup,
  DeleteExercise,
  DeleteExerciseGroup,
  UpdateExerciseGroup
} from '../store/exercise.actions';
import { ExerciseState } from '../store/exercise.state';

@Component({
  selector: 'progress-exercise-group',
  templateUrl: './exercise-group.component.html',
  styleUrls: ['./exercise-group.component.scss']
})
export class ExerciseGroupComponent implements OnInit {
  @Select(ExerciseState.exercises) exercises$: Observable<Exercise[]>;

  @Input() exerciseGroup: ExerciseGroup;
  exercises: Exercise[];

  mainForm: FormGroup;

  subscription = new Subscription();

  edit = false;

  constructor(private fb: FormBuilder, private store: Store, private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      id: this.exerciseGroup?.id,
      name: [this.exerciseGroup?.name, Validators.required]
    });

    this.subscription.add(
      this.exercises$
        .pipe(
          map(exercises => exercises?.filter(exercise => exercise.exerciseGroupId === this.exerciseGroup?.id)),
          tap(result => {
            if (!result) return;
            this.exercises = result;
          })
        )
        .subscribe()
    );
  }

  update() {
    this.store.dispatch(new UpdateExerciseGroup(this.mainForm.value));
  }

  delete() {
    if (this.exerciseGroup?.id) {
      this.store.dispatch(new DeleteExerciseGroup(this.exerciseGroup?.id));
    }
  }

  open(exercise: Exercise) {
    this.bottomSheet.open(ExerciseEditFormComponent, {
      data: { exerciseGroupId: this.exerciseGroup.id, exercise: exercise }
    });
  }

  addExercise() {
    this.bottomSheet.open(ExerciseEditFormComponent, {
      data: { exerciseGroupId: this.exerciseGroup.id }
    });
  }

  deleteExercise(id: string) {
    this.store.dispatch(new DeleteExercise(id));
  }
}
