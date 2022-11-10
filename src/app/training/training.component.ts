import { Component, OnInit, OnDestroy } from '@angular/core';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
    ongoingTraining = false;
    exerciseSubscription: Subscription = new Subscription();
    exercises: Exercise[] | null = [];
    currentExercise: Exercise | null = null;

    constructor(
        private dialog: MatDialog,
        private trainingService: TrainingService
    ) {}

    ngOnInit() {
        this.getExercises();
        this.getCurrrentExercise();
    }

    getExercises() {
        this.exerciseSubscription =
            this.trainingService.availableExercises$.subscribe(
                (exercises) => (this.exercises = exercises)
            );
    }

    getCurrentExercise() {
        this.exerciseSubscription =
            this.trainingService.currentExercise$.subscribe((exercise) => {
                if (exercise) {
                    this.ongoingTraining = true;
                } else {
                    this.ongoingTraining = false;
                }
            });
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
}
