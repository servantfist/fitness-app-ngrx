export interface Exercise {
    id?: number;
    collection?: string;
    name?: string;
    status: string;
    duration?: number;
    totalDuration?: number;
    caloriesPerSession?: 8;
    totalCaloriesBurnered?: number;
    date?: Date;
    state?: 'completed' | 'paused' | null;
    sessionsStarted?: number;
    sessionsCompleted?: number;
}