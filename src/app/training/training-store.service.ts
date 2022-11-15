import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Observable } from 'rxjs';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
import { CurrentTrainingComponent } from './current-training/current-training.component';

/*
https://indepth.dev/posts/1508/structure-initialization-logic-without-ngoninit-utilize-observables-and-ngonchanges
*/

@Injectable({
    providedIn: 'root',
})
export class TrainingStore {
    constructor(private trainingService: TrainingService) { }
    
    availableExercises: Exercise[] = [];

    private currentExercise: Exercise | undefined = undefined;
    exerciseChanged = new ReplaySubject<Exercise | undefined>();

    changeSelectedExercise(selectedExercise: Exercise | undefined): void {
        this.exerciseChanged.next(selectedExercise);
    }

    startExercise(selectedId: number) {
        this.trainingService.
                this.currentExercise = this.trainingService.getExercises(
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

    getExercises(): Observable<Exercise[]> {
        if (!this.availableExercises) {
            this.availableExercises = this.trainingService.exercises$;
            
        }
    }

    getCurrentExercise() {
        return { ...this.currentExercise };
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
    }

    fetchCompletedOrCancelledExercises() {
        return this.availableExercises.filter((exercise) => {
            exercise.state != null;
        });
    }
}
