import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';

// Stopwatch component using React Functional Components.
const App: React.FC = () => {
    // State: `time` for stopwatch time in milliseconds, `isRunning` for stopwatch status.
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    
    // Effect to handle the stopwatch timing logic.
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Start interval timer if `isRunning` is true, update `time` every 10ms.
        if (isRunning) {
            interval = setInterval(() => setTime(time => time + 10), 10);
        }
        // Cleanup: clear interval on `isRunning` change.
        return () => interval && clearInterval(interval);
    }, [isRunning]);


    // useCallback ensures that the same function instance is reused across renders.
    const handleStart = useCallback(() => {
        setIsRunning(true);
    }, []);

    const handleStop = useCallback(() => {
        setIsRunning(false);
    }, []);

    const handleReset = useCallback(() => {
        setTime(0);
    }, []);

    return (
        <div className="App">
            <div className="stopwatch-container">
                <StopWatch time={time} />
                <StopWatchButton
                isRunning={isRunning}
                time={time}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
                />
            </div>
        </div>
    )
};

export default App;
