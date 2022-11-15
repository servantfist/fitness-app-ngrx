import { Component } from '@angular/core';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { MatDialog } from '@angular/material/dialog';
import { TrainingStoreService } from './training-store.service';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent {
    ongoingTraining = false;
    exerciseSubscription: Subscription = new Subscription();
    exercises$ = this.trainingService.exercises$;
    exerciseProgress$ = this.trainingStoreService.exercisesWithProgress$;

    constructor(
        private trainingService: TrainingService,
        private trainingStoreService: TrainingStoreService
    ) {}
}
