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
import { AuthService } from './auth/auth.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SideNavComponent,
        WelcomeComponent,
        MessagesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false },
        ),
        MaterialModule,
        AuthModule,
        TrainingModule,
    ],
    exports: [MaterialModule, FormsModule, ReactiveFormsModule],
    providers: [AuthService],
    bootstrap: [AppComponent],
    entryComponents: [StopTrainingComponent],
})
export class AppModule {}
