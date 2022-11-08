import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SideNavComponent,
        WelcomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        MaterialModule,
        AuthModule,
        TrainingModule,
    ],
    exports: [MaterialModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [StopTrainingComponent],
})
export class AppModule {}
