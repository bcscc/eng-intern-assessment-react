import { formatTime } from '../utils/index';

describe('formatTime function', () => {
    test('correctly formats milliseconds into HH:MM:SS.XX', () => {
        const ms = 45296780; // 12 hour, 34 minutes, 56 seconds, and 78 milliseconds
        const formattedTime = formatTime(ms);
        expect(formattedTime).toBe('12:34:56.78');
    });

    test('pads single-digit hours, minutes, seconds, and milliseconds with zeros', () => {
        const ms = 3661010; // 1 hour, 1 minute, 1 second, and 10 milliseconds
        const formattedTime = formatTime(ms);
        expect(formattedTime).toBe('01:01:01.01');
    });

    test('correctly resets hours to 0 once surpasses 100 hours', () => {
        const ms = 359999000; // 1 hour, 1 minute, 1 second, and 10 milliseconds
        const formattedTime = formatTime(ms);
        expect(formattedTime).toBe('99:59:59.00');
        const msNew = ms + 1000;
        const newFormattedTime = formatTime(msNew);
        expect(newFormattedTime).toBe('00:00:00.00');
    });
});

