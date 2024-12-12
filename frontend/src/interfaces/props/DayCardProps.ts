import dayjs from 'dayjs';
import { Session, SessionWithExercises } from '../data/session/Session';

export interface DayCardProps {
    date: dayjs.Dayjs;
    session?: SessionWithExercises | Session;
}