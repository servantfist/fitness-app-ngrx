import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';

@NgModule({
    declarations: [
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent,
        TrainingComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    exports: [PastTrainingsComponent],
})
export class TrainingModule {}
