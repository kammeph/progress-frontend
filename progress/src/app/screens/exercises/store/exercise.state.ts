import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { Exercise, ExerciseGroup } from '../exercise.model';
import { ExerciseService } from '../services/exercise.service';
import {
  CreateExercise,
  CreateExerciseGroup,
  DeleteExercise,
  DeleteExerciseGroup,
  GetAllExerciseGroups,
  GetAllExercises,
  GetAllExercisesByGroupId,
  GetExercise,
  UpdateExercise,
  UpdateExerciseGroup
} from './exercise.actions';

export class ExerciseStateModel {
  exercises: Exercise[];
  exerciseGroups: ExerciseGroup[];
}

@State<ExerciseStateModel>({
  name: 'exercise',
  defaults: new ExerciseStateModel()
})
@Injectable()
export class ExerciseState implements NgxsOnInit {
  constructor(private exerciseService: ExerciseService) {}

  ngxsOnInit(ctx?: StateContext<any>) {}

  @Selector()
  static exercises(state: ExerciseStateModel) {
    return state.exercises;
  }

  @Selector()
  static exerciseGroups(state: ExerciseStateModel) {
    return state.exerciseGroups;
  }

  @Action(GetAllExerciseGroups)
  getAllExerciseGroups({ patchState }: StateContext<ExerciseStateModel>) {
    return this.exerciseService.getAllExerciseGroups().pipe(tap(result => patchState({ exerciseGroups: result })));
  }

  @Action(CreateExerciseGroup)
  createExerciseGroup({ setState }: StateContext<ExerciseStateModel>, { exerciseGroup }: CreateExerciseGroup) {
    return this.exerciseService.createExerciseGroup(exerciseGroup).pipe(
      tap(result =>
        setState(
          patch({
            exerciseGroups: append<ExerciseGroup>([result])
          })
        )
      )
    );
  }

  @Action(UpdateExerciseGroup)
  updateExerciseGroup({ setState }: StateContext<ExerciseStateModel>, { exerciseGroup }: UpdateExerciseGroup) {
    return this.exerciseService.updateExerciseGroup(exerciseGroup).pipe(
      tap(result =>
        setState(
          patch({
            exerciseGroups: updateItem<ExerciseGroup>(group => group.id === result.id, result)
          })
        )
      )
    );
  }

  @Action(DeleteExerciseGroup)
  deleteExerciserGroup({ setState }: StateContext<ExerciseStateModel>, { id }: DeleteExerciseGroup) {
    return this.exerciseService.deleteExerciseGroup(id).pipe(
      tap(() =>
        setState(
          patch({
            exerciseGroups: removeItem<ExerciseGroup>(group => group.id === id)
          })
        )
      )
    );
  }

  @Action(GetAllExercises)
  getAllExercises({ patchState }: StateContext<ExerciseStateModel>) {
    return this.exerciseService.getAllExercises().pipe(tap(result => patchState({ exercises: result })));
  }

  @Action(CreateExercise)
  createExercise({ setState }: StateContext<ExerciseStateModel>, { exercise }: CreateExercise) {
    return this.exerciseService
      .createExercise(exercise)
      .pipe(tap(result => setState(patch({ exercises: append<Exercise>([result]) }))));
  }

  @Action(UpdateExercise)
  updateExercise({ setState }: StateContext<ExerciseStateModel>, { exercise }: UpdateExercise) {
    return this.exerciseService.updateExercise(exercise).pipe(
      tap(result =>
        setState(
          patch({
            exercises: updateItem<Exercise>(exercise => exercise.id === result.id, result)
          })
        )
      )
    );
  }

  @Action(DeleteExercise)
  deleteExercise({ setState }: StateContext<ExerciseStateModel>, { id }: DeleteExercise) {
    return this.exerciseService.deleteExercise(id).pipe(
      tap(() =>
        setState(
          patch({
            exercises: removeItem<Exercise>(exercise => exercise.id === id)
          })
        )
      )
    );
  }
}
