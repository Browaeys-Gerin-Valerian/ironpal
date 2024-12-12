import dayjs from 'dayjs';
import { SessionWithExercises } from '../data/session/Session';
export interface DayCardProps {
    date: dayjs.Dayjs;
    session?: SessionWithExercises
}