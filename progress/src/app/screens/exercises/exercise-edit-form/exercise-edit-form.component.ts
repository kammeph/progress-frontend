import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngxs/store';
import { Exercise, MuscleGroup } from '../exercise.model';
import { CreateExercise, UpdateExercise } from '../store/exercise.actions';

@Component({
  selector: 'progress-exercise-edit-form',
  templateUrl: './exercise-edit-form.component.html',
  styleUrls: ['./exercise-edit-form.component.scss']
})
export class ExerciseEditFormComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() exerciseGroupId: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: { exercise: Exercise; exerciseGroupId: string },
    private bottomSheet: MatBottomSheet
  ) {
    this.exercise = data?.exercise;
    this.exerciseGroupId = data?.exerciseGroupId;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.exercise?.id,
      exerciseGroupId: this.exercise?.exerciseGroupId ?? this.exerciseGroupId,
      name: [this.exercise?.name, Validators.required],
      loadingFactors: this.fb.array([])
    });

    if (this.exercise?.loadingFactors) {
      this.exercise.loadingFactors.forEach(loadingFactor =>
        this.loadingFactorForms.push(
          this.fb.group({
            muscleGroup: loadingFactor.muscleGroup,
            value: loadingFactor.value
          })
        )
      );
    } else {
      for (let muscleGroup in MuscleGroup) {
        this.loadingFactorForms.push(
          this.fb.group({
            muscleGroup: MuscleGroup[muscleGroup],
            value: [0, [Validators.required, Validators.min(0), Validators.max(1)]]
          })
        );
      }
    }
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get loadingFactorForms() {
    return this.form.get('loadingFactors') as FormArray;
  }

  save() {
    if (this.exercise?.id) {
      this.updateExercise();
    } else {
      this.createExercise();
    }
    this.bottomSheet.dismiss();
  }

  updateExercise() {
    this.store.dispatch(new UpdateExercise(this.form.value));
  }

  createExercise() {
    const { id, ...newExercise } = this.form.value;
    this.store.dispatch(new CreateExercise({ exerciseGroupId: this.exerciseGroupId, ...newExercise }));
  }

  close() {
    this.bottomSheet.dismiss();
  }
}
