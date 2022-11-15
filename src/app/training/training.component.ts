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
export class TrainingComponent {

    /*
    We are subscribing in the template (via AsyncPipe), not in the constructor — so none of our (possibly complex) logic will be run at the component’s creation.
    */
    readonly currentExercise$ = this.trainingStore.getCurrentExercise();
    readonly exercises$ = this.trainingStore.getExercises();
    readonly ongoingTraining = this.trainingStore.getOngoingTraining();

    constructor(
        private dialog: MatDialog,
        private trainingStore: TrainingStore
    ) {}

}
