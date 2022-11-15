import { Injectable } from '@angular/core';

import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TrainingStoreService {
    constructor(private trainingService: TrainingService) {}

    private availableExercises: Exercise[] = [];

    private currentExercise: Exercise | undefined = {
        id: 0,
        collection: 'core',
        name: '',
        state: 'not-started',
        duration: 0,
        totalDuration: 0,
        caloriesPerSession: 0,
        totalCaloriesBurnered: 0
    };

    exercisesWithProgress$ = this.trainingService.exercises$.pipe(
        map((exercises) =>
            exercises.filter((exercise) => exercise.state != 'not-started')
        )
    );

    exerciseSelectedSubject = new BehaviorSubject<Exercise | undefined>(
        this.currentExercise
    );
    exerciseSelected$ = this.exerciseSelectedSubject.asObservable();

    exerciseInProgressSubject = new BehaviorSubject<boolean>(false);
    exerciseInProgress$ = this.exerciseInProgressSubject.asObservable();

    startExercise(exerciseId: number) {
        if (this.currentExercise != undefined) {
            this.currentExercise = this.availableExercises.find(
                (ex) => ex.id === exerciseId
            );
        }

        this.exerciseSelectedSubject.next({ ...this.currentExercise });
        this.exerciseInProgressSubject.next(true);
    }

    cancelExercise(ex: Exercise, progress: number) {
        let updatedExercise: Exercise = {};

        if (ex.duration && ex.caloriesPerSession) {
            const duration = ex.duration * (progress / 100);
            const calories = ex.caloriesPerSession * (progress / 100);

            updatedExercise = {
                ...ex,
                totalDuration: duration,
                totalCaloriesBurnered: calories,
                date: new Date(),
                state: 'paused'
            };
        }

        this.trainingService.updateExercise(updatedExercise);

        this.currentExercise = undefined;
        this.exerciseSelectedSubject.next(undefined);
    }

    completeExercise(progress: number) {
        let cals = 0;
        let tCals = 0;
        let dur = 0;
        let tDur = 0;

        if (this.currentExercise?.caloriesPerSession != undefined) {
            cals = this.currentExercise?.caloriesPerSession * (progress / 100);
        }

        if (this.currentExercise?.totalCaloriesBurnered != undefined) {
            tCals = this.currentExercise?.totalCaloriesBurnered + cals;
        }

        if (this.currentExercise?.duration != undefined) {
            dur = this.currentExercise?.duration * (progress / 100);
        }

        if (this.currentExercise?.totalDuration != undefined) {
            tDur = this.currentExercise?.totalDuration + dur;
        }

        const completedExercise: Exercise = {
            ...this.currentExercise,
            date: new Date(),
            state: 'completed',
            totalDuration: tDur * (progress / 100),
            totalCaloriesBurnered: tCals
        };

        this.trainingService.updateExercise(completedExercise);
        this.exerciseInProgressSubject.next(false);
    }

    // get exercisesWithProgress(): Observable<Exercise[]> {
    //   return this.trainingService.exercises$
    //     .pipe(
    //       map(exercises =>
    //       exercises.filter(exercise => exercise.state != 'not-started'))
    //     );
    // }
}
