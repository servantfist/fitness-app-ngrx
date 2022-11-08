import { Component, OnInit } from '@angular/core';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
    ongoingTraining = false;

    constructor() {}

    ngOnInit(): void {}
}
