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
            collection: 'stomach',
            name: 'Crunches',
            status: 'Never Started',
            duration: 30,
            caloriesPerSession: 8,
            caloriesBurnered: 0,
        },
      {
        id: 2,
        name: 'Touch Toes',
        duration: 180,
        calories: 15
      },
      {
        id: 3,
        name: 'Side Lunges',
        duration: 120,
        calories: 18
      },
      {
        id: 4,
        name: 'Burpees',
        duration: 60,
        calories: 8
      },
    ];
    return { exercises };
  }

  /* This is not needed for this example, but could add an id
  genId(exercises: Exercise[]): number {
    return exercises.length > 0 ? Math.max(...exercises.map(exercise => exercise.id)) + 1 : 11;
  }
  */

}
