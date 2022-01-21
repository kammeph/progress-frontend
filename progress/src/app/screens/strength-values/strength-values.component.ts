import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, tap } from 'rxjs';
import {
  GetAllStrengthValues,
  UpdateStrengthValues,
} from './store/strength-value.actions';
import { StrengthValueState } from './store/strength-value.state';
import { StrengthValue } from './strength-value.models';
import { rpeChart } from 'src/assets/rpeChart';

@Component({
  selector: 'progress-strength-values',
  templateUrl: './strength-values.component.html',
  styleUrls: ['./strength-values.component.scss'],
})
export class StrengthValuesComponent implements OnInit, OnDestroy {
  @Select(StrengthValueState.strengthValues) strengthValues$: Observable<
    StrengthValue[]
  >;

  mainForm: FormGroup;
  subscription = new Subscription();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      total: 0,
      strengthValues: this.fb.array([]),
    });

    this.subscription.add(
      this.strengthValues$
        .pipe(
          tap((strengthValues) => {
            if (strengthValues) {
              this.strengthValuesForms.clear();
              strengthValues.forEach((strengthValue) => {
                const strengthValueGroup =
                  this.createStrengthValueFormGroup(strengthValue);
                this.subscribeWeigthChages(strengthValueGroup);
                this.subscribeRepsChages(strengthValueGroup);
                this.strengthValuesForms.push(strengthValueGroup);
              });
              this.updateTotal();
            }
          })
        )
        .subscribe()
    );

    this.store.dispatch(new GetAllStrengthValues());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get strengthValuesForms() {
    return this.mainForm.get('strengthValues') as FormArray;
  }

  save() {
    this.store.dispatch(
      new UpdateStrengthValues(this.strengthValuesForms.value)
    );
  }

  createStrengthValueFormGroup(strengthValue: StrengthValue): FormGroup {
    return this.fb.group({
      id: strengthValue.id,
      name: strengthValue.name,
      description: strengthValue.description,
      weight: [strengthValue.weight, [Validators.required, Validators.min(1)]],
      reps: [
        strengthValue.reps,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      oneRepMax: strengthValue.oneRepMax,
      includeInTotal: strengthValue.includeInTotal,
    });
  }

  getWeight(index: number) {
    return this.strengthValuesForms.controls[index].get(
      'weight'
    ) as FormControl;
  }

  getReps(index: number) {
    return this.strengthValuesForms.controls[index].get('reps') as FormControl;
  }

  private subscribeWeigthChages(formGroup: FormGroup) {
    this.subscription.add(
      formGroup
        .get('weight')
        .valueChanges.pipe(
          tap((weight) => {
            if (weight) {
              const reps = formGroup.get('reps').value;
              formGroup.patchValue({
                oneRepMax: this.calcOneRepMax(weight, reps),
              });
              this.updateTotal();
            }
          })
        )
        .subscribe()
    );
  }

  private subscribeRepsChages(formGroup: FormGroup) {
    this.subscription.add(
      formGroup
        .get('reps')
        .valueChanges.pipe(
          tap((reps) => {
            if (reps && reps > 0 && reps <= 12) {
              const weight = formGroup.get('weight').value;
              formGroup.patchValue({
                oneRepMax: this.calcOneRepMax(weight, reps),
              });
              this.updateTotal();
            }
          })
        )
        .subscribe()
    );
  }

  private calcOneRepMax(weight: number, reps: number): number {
    return Number((weight / rpeChart['10'][reps.toString()]).toFixed(2));
  }

  private updateTotal() {
    const strengthValues: StrengthValue[] = this.strengthValuesForms.value;
    this.mainForm.patchValue({
      total: strengthValues.reduce((sum, strengthValue) => {
        if (strengthValue.includeInTotal) {
          sum += strengthValue.oneRepMax;
        }
        return sum;
      }, 0.0),
    });
  }
}
