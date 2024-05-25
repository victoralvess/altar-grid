import { SystemClock } from '../../src/services/system-clock';

describe('SystemClock', () => {
    let systemClock: SystemClock;

    beforeEach(() => {
        systemClock = new SystemClock();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it.each([
        [new Date('2024-05-25T19:30:00.000Z'), '00'],
        [new Date('2024-05-22T17:26:27.000Z'), '27'],
        [new Date('2024-05-30T11:32:59.000Z'), '59'],
    ])(
        'should return the the correct number of seconds from the current system time',
        (currentTime: Date, expectedSeconds: string) => {
            vi.setSystemTime(currentTime);

            expect(systemClock.getSeconds()).toBe(expectedSeconds);
        }
    );
});