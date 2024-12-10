import dayjs from 'dayjs';
import { Session } from '../data/session/Session';
export interface DayCardProps {
    date: dayjs.Dayjs;
    session?: Session
}