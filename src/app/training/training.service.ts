import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { MessageService } from '../message.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    // Uses in memory api
    private exercisesUrl = 'api/exercises';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    exercises$ = this.http.get<Exercise[]>(this.exercisesUrl).pipe(
        tap(() => {
            return this.log('fetched exercises');
        }),
        catchError(
            this.handleError<Exercise[]>('TrainingService: Get Exercises', [])
        )
    );

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    updateExercise(exercise: Exercise) {
        this.http.put(this.exercisesUrl, exercise, this.httpOptions).pipe(
            tap(() => this.log(`updated exercise: ${exercise.name}`)),
            catchError(this.handleError<HttpErrorResponse>('updateExercise'))
        );
    }

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