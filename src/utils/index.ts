export const MILLISECONDS_IN_SECOND = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTE_IN_HOUR = 60;


export type TimeFormat = (ms: number) => string;

// Function to format milliseconds into a time string (HH:MM:SS.XX).
export const formatTime: TimeFormat = (ms: number): string => {
    const getHours = (ms: number): string => ("0" + Math.floor((ms / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTE_IN_HOUR)))).slice(-2);
    const getMinutes = (ms: number): string => ("0" + Math.floor((ms / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)) % 60)).slice(-2);
    const getSeconds = (ms: number): string => ("0" + Math.floor((ms / MILLISECONDS_IN_SECOND) % 60)).slice(-2);
    const getMilliSeconds = (ms: number): string => ("0" + ((ms / 10) % 100)).slice(-2);
    
    return `${getHours(ms)}:${getMinutes(ms)}:${getSeconds(ms)}.${getMilliSeconds(ms)}`;
};