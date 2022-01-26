import { Exercise, ExerciseGroup } from '../exercise.model';

export class GetAllExerciseGroupsWithExercises {
  static readonly type = '[Exercise] Get All Exercise Groups With Exercises';
}

export class GetAllExerciseGroups {
  static readonly type = '[Exercise] Get All Exercise Groups';
}

export class CreateExerciseGroup {
  static readonly type = '[Exercise] Create Exercise Group';
  constructor(public exerciseGroup: ExerciseGroup) {}
}

export class UpdateExerciseGroup {
  static readonly type = '[Exercise] Update Exercise Group';
  constructor(public exerciseGroup: ExerciseGroup) {}
}

export class DeleteExerciseGroup {
  static readonly type = '[Exercise] Delete Exercise Group';
  constructor(public id: string) {}
}

export class GetAllExercisesByGroupId {
  static readonly type = '[Exercise] Get All Exercises By Group Id';
  constructor(public exerciseGroupId: string) {}
}

export class GetAllExercises {
  static readonly type = '[Exercise] Get All Exercises';
}

export class GetExercise {
  static readonly type = '[Exercise] Get Exercise';
  constructor(public id: string) {}
}

export class CreateExercise {
  static readonly type = '[Exercise] Create Exercise';
  constructor(public exercise: Exercise) {}
}

export class UpdateExercise {
  static readonly type = '[Exercise] Update Exercise';
  constructor(public exercise: Exercise) {}
}

export class DeleteExercise {
  static readonly type = '[Exercise] Delete Exercise';
  constructor(public id: string) {}
}
