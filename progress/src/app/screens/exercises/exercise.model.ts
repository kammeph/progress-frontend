export interface ExerciseGroup {
  id?: string;
  name: string;
}

export interface ExerciseGroupWithExercises extends ExerciseGroup {
  exercises: Exercise[];
}

export interface Exercise {
  id?: string;
  exerciseGroupId: string;
  name: string;
  loadingFactors: LoadingFactor[];
}

export interface LoadingFactor {
  value: number;
  muscleGroup: MuscleGroup;
}

export enum MuscleGroup {
  SQUAT = 'Squat',
  BENCH = 'Bench',
  DEADLIFT = 'Deadlift',
  QUADS = 'Quads',
  GLUTES = 'Glutes',
  HAMSTRINGS = 'Hamstrings',
  CHEST = 'Chest',
  BACK = 'Back',
  CORE = 'Core',
  SCHOULDER = 'Shoulder',
  TRICEPS = 'Triceps',
  BICEPS = 'Biceps'
}
