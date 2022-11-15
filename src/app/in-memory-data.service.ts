import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const exercises = [
            {
                id: 1,
                collection: 'core',
                name: 'Crunches',
                state: 'not-started',
                duration: 30,
                totalDuration: 0,
                caloriesPerSession: 8,
                caloriesBurnered: 0
            },
            {
                id: 2,
                collection: 'core',
                name: 'Touch Toes',
                state: 'not-started',
                duration: 180,
                totalDuration: 0,
                caloriesPerSession: 15,
                totalCaloriesBurnered: 0
            },
            {
                id: 3,
                collection: 'core',
                name: 'Side Lunges',
                state: 'not-started',
                duration: 120,
                totalDuration: 0,
                caloriesPerSession: 18,
                totalCaloriesBurnered: 0
            },
            {
                id: 4,
                collection: 'full',
                name: 'Burpees',
                state: 'not-started',
                duration: 60,
                totalDuration: 0,
                caloriesPerSession: 8,
                totalCaloriesBurnered: 0
            },
            {
                id: 5,
                collection: 'chest',
                name: 'Push Ups',
                duration: 20,
                totalDuration: 0,
                caloriesPerSession: 8,
                totalCaloriesBurnered: 0
            },
            {
                id: 6,
                collection: 'legs',
                name: 'Squats',
                state: 'not-started',
                duration: 20,
                totalDuration: 0,
                caloriesPerSession: 8,
                totalCaloriesBurnered: 0
            }
        ];
        return { exercises };
    }

    /* This is not needed for this example, but could add an id
  genId(exercises: Exercise[]): number {
    return exercises.length > 0 ? Math.max(...exercises.map(exercise => exercise.id)) + 1 : 11;
  }
  */
}
