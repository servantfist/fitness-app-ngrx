import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { MessageService } from '../message.service';

@Injectable({
    providedIn: 'root',
})
export class TrainingService {
    // Uses in memory api
    private exercisesUrl = 'api/exercises';

    // local variable to hold reference
    private availableExercises: Exercise[] = [];
    
    /* Replay Subject is better than BehaviorSubject because it doesn't 
    require an initial value (typically undefined) */
    exercisesSubject = new ReplaySubject<Exercise[]>();
    exercises$ = this.exercisesSubject.asObservable();

    // API header definition
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    getExercises(): Observable<Exercise[]> {
        if (this.availableExercises) {
            return this.exercises$;
        }
        return this.http.get<Exercise[]>(this.exercisesUrl).pipe(
            tap((data) => this.log('fetched exercises' + JSON.stringify(data))),
            tap((data) => {
                this.availableExercises = data;
                this.exercisesSubject.next(this.availableExercises);
            }),
            catchError(this.handleError<Exercise[]>('getExercises', []))
        );
    }

    updateExercise(exercise: Exercise): Observable<Exercise> {
        return this.http
            .put<Exercise>(this.exercisesUrl, exercise, this.httpOptions)
            .pipe(
                tap(() => console.log(`updateExercise: ${exercise.id}`)),
                tap(() => {
                    const foundIndex = this.availableExercises.findIndex(
                        (exercise) => exercise.id === exercise.id
                    );
                    if (foundIndex > -1) {
                        this.availableExercises[foundIndex] = exercise;
                    }
                    this.exercisesSubject.next(this.availableExercises);
                }),
                map(() => exercise),
                catchError(this.handleError<Exercise>('updateExercise'))
            );
    }

    handleError<T>(operation = 'operation', result?: T) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`TrainingService: ${message}`);
    }
}
