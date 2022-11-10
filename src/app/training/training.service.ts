import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
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

    exercisesSubject = new BehaviorSubject<Exercise[]>(this.availableExercises);
    exercisesChanged = this.exercisesSubject.asObservable();

    exerciseChanged = new Subject<Exercise>();
    private currentExercise: Exercise | undefined;

    // API header definition
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    // Functions
    changeSelectedExercise(selectedExercise: Exercise | undefined): void {
        this.exerciseChanged.next(selectedExercise);
    }

    startExercise(selectedId: number) {
        this.currentExercise = this.availableExercises.find(
            (ex) => ex.id === selectedId
        );
        this.exerciseChanged.next(this.currentExercise);
    }

    completeExercise(exercise: Exercise): void {
        this.currentExercise = {
            ...exercise,
            date: new Date(),
            state: 'completed',
        };
        this.availableExercises.push({
            ...this.currentExercise,
        });
        this.currentExercise = undefined;
        this.exerciseChanged.next(undefined);
        this.exercisesSubject.next(this.availableExercises);
    }

    private getExercises() {
        if (!this.availableExercises) {
            return this.http.get<Exercise[]>(this.exercisesUrl).pipe(
                map((ex: Exercise[]) => (this.availableExercises = ex)),
                tap(() => {
                    console.log(this.availableExercises);
                    return this.log('fetched exercises');
                }),
                catchError(this.handleError<Exercise[]>('getExercises', []))
            );
        }
    }

    getCurrentExercise() {
        return { ...this.currentExercise };
    }

    cancelExercise(ex: Exercise, progress: number) {
        if (ex.duration && ex.caloriesPerSession) {
            const duration = ex.duration * (progress / 100);
            const calories = ex.caloriesPerSession * (progress / 100);

            this.currentExercise = {
                ...ex,
                totalDuration: duration,
                totalCaloriesBurnered: calories,
                date: new Date(),
                state: 'paused',
            };

            this.updateExercise({
                ...this.currentExercise,
            });
        }

        this.currentExercise = undefined;
        this.exerciseChanged.next(undefined);
    }

    fetchCompletedOrCancelledExercises() {
        return this.availableExercises.filter((exercise) => {
            exercise.state != null;
        });
    }

    createExercise(exercise: Exercise): Observable<Exercise> {
        // Product Id must be null for the Web API to assign an Id
        const exId = this.getNewExerciseId();
        const newExercise = { ...exercise, id: exId };
        this.exerciseChanged.next(newExercise);

        this.availableExercises.push(newExercise);
        this.exercisesSubject.next(this.availableExercises);
        return this.http
            .post<Exercise>(this.exercisesUrl, newExercise, this.httpOptions)
            .pipe(
                tap((newExercise: Exercise) =>
                    console.log(
                        'Created Exercise: ' + JSON.stringify(newExercise)
                    )
                ),
                catchError(this.handleError<Exercise>())
            );
    }

    getNewExerciseId() {
        let newId = 0;
        const maxArray = [];
        if (this.availableExercises.length > 0) {
            for (const ex of this.availableExercises) {
                if (ex.id && !isNaN(ex.id)) {
                    maxArray.push(ex.id);
                }
            }

            if (maxArray.length > 0) {
                newId = Math.max(...maxArray) + 1;
            }
        } else {
            newId = 11;
        }
        return newId;
    }

    updateExercise(exercise: Exercise): Observable<any> {
        return this.http
            .put(this.exercisesUrl, exercise, this.httpOptions)
            .pipe(
                tap(() => this.log(`updated exercise: ${exercise.name}`)),
                catchError(
                    this.handleError<HttpErrorResponse>('updateExercise')
                )
            );
    }

    // private addDataToDatabase(exercise: Exercise) {
    //     this.db.collection('finishedExercises').add(exercise);
    // }

    private handleError<T>(operation = 'operation', result?: T) {
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
