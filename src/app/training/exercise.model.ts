export interface Exercise {
    id?: number;
    collection?: 'core' | 'chest' | 'legs' | 'back' | 'arms' | 'full';
    name?: string;
    state?: 'completed' | 'paused' | 'not-started';
    duration?: number;
    totalDuration?: number;
    caloriesPerSession?: number;
    totalCaloriesBurnered?: number;
    date?: Date;
    sessionsStarted?: number;
    sessionsCompleted?: number;
}