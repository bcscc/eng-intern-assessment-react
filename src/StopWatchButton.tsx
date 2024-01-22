import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;
    time: number;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
}

/**
 * StopWatchButton component dynamically renders control buttons for the stopwatch.
 * It shows 'Start' or 'Resume' when the stopwatch is not running,
 * 'Stop' and 'Lap' when the stopwatch is running, and 'Reset' when it's not running but has a non-zero time.
 */
const StopWatchButton: React.FC<StopWatchButtonProps> = ( { isRunning, time, onStart, onStop, onReset, onLap}) => {
    return (
        <div className="buttons">
            {!isRunning && !time && <button onClick={onStart}>Start</button>}
            {!isRunning && time > 0 && <button onClick={onStart}>Resume</button>}
            {isRunning && <button onClick={onStop}>Stop</button>}
            {!isRunning && time > 0 && <button onClick={onReset}>Reset</button>}
            {isRunning && time > 0 && <button onClick={onLap}>Lap</button>}
        </div>
    );
};

export default StopWatchButton;
