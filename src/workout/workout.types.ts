export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Lats'
  | 'Shoulders'
  | 'Triceps'
  | 'Biceps'
  | 'Quads'
  | 'Hamstrings'
  | 'Glutes'
  | 'Core'
  | 'Obliques'
  | 'Pelvic Floor'
  | 'Calves'
  | 'Cardio / Full Body'
  | 'Hip Mobility';

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: MuscleGroup[];
  equipment:
    'Dumbbells' | 'Bodyweight' | 'Jump Rope' | 'Mat / Floor' | 'Chair / Bench';
  cue: string;
  instructions: string[];
  mistakes: string[];
  tempo?: string;
  illustrationType: string;
  defaultRepsOrTime: string;
  category: 'cardio' | 'abs' | 'pelvic' | 'mobility' | 'strength';
}

export interface WorkoutSetItem {
  exerciseId: string;
  customName?: string;
  prescription: string;
  cue?: string;
  note?: string;
}

export interface WorkoutGroup {
  name: string; // e.g. "Superset A", "Superset B", "Circuit", "Straight sets"
  restNote?: string;
  exercises: WorkoutSetItem[];
}

export interface EveningRoutine {
  label: string;
  subtitle?: string;
  note?: string;
  finisher?: string;
  groups: WorkoutGroup[];
}

export interface MorningRoutine {
  skipping: {
    title: string;
    duration: string;
    cue?: string;
  };
  abs: WorkoutSetItem[];
  pelvic: WorkoutSetItem[];
  mobility: WorkoutSetItem[];
}

export interface DayPlan {
  dayKey: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  fullName: string;
  morning: MorningRoutine;
  evening: EveningRoutine;
}
