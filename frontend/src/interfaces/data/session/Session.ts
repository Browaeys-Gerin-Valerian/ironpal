import { MuscleGroup } from "../muscle_group/MuscleGroup";
import { SessionExerciseWithExerciseAndSets } from "../session_exercise/SessionExercise";


//A revoir la session date den fonction du type renvoyé par le serveur
export interface Session {
    id: number;
    title: string;
    session_date: string;
    validated: boolean;
}

//A REVOIR PEUT ETRE LE TYPE UNE FOIS QU ON TRAVAILLE AVEC LA DONNE DE BDD
//export type SessionWithExercises = Omit<Session, 'validated' | 'id'> & { exercises: string[] }
export type SessionWithExercises = Omit<Session, 'validated'> & { exercises: string[] };

export type SessionWithMuscleGroupAndSessionExercises = Session & { muscle_group: MuscleGroup, session_exercise: SessionExerciseWithExerciseAndSets[] }