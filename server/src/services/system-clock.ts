import { Clock } from '../domain/services/clock';

export class SystemClock implements Clock {
    getSeconds(): string {
        return new Date().toTimeString().substring(6, 8);
    }
}