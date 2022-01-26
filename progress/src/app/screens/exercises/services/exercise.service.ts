import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from 'src/app/lib/services/api-base.service';
import { Exercise, ExerciseGroup } from '../exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends ApiBaseService {
  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    super(http, apiUrl, 'exercises');
  }

  getAllExerciseGroups(): Observable<ExerciseGroup[]> {
    return this.http.get<ExerciseGroup[]>(`${this.apiUrl}/${this.prefix}/groups`);
  }

  createExerciseGroup(exerciseGroup: ExerciseGroup): Observable<ExerciseGroup> {
    return this.http.post<ExerciseGroup>(`${this.apiUrl}/${this.prefix}/group`, exerciseGroup);
  }

  updateExerciseGroup(exerciseGroup: ExerciseGroup): Observable<ExerciseGroup> {
    return this.http.put<ExerciseGroup>(`${this.apiUrl}/${this.prefix}/group/${exerciseGroup.id}`, exerciseGroup);
  }

  deleteExerciseGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.prefix}/group/${id}`);
  }

  getAllExercisesByGroupId(exerciseGroupId: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/${this.prefix}/by-group/${exerciseGroupId}`);
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/${this.prefix}`);
  }

  getExercise(id: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/${this.prefix}/${id}`);
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/${this.prefix}`, exercise);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${this.prefix}/${exercise.id}`, exercise);
  }

  deleteExercise(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.prefix}/${id}`);
  }
}
