import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';
import { formatTime } from './utils';

// Stopwatch component using React Functional Components.
const App: React.FC = () => {
    // State: `time` for stopwatch time in milliseconds, `isRunning` for stopwatch status and 'laps' to record lap times.
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
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
        setLaps([]);
    }, []);

    const handleLap = useCallback(() => {
        // Calculate the duration of the new lap by subtracting the total duration of previous laps from the current time.
        // `reduce` iterates over `laps`, accumulating total lap time in `acc` and using `current` to refer to the current lap time.
        const totalPreviousLaps = laps.reduce((acc, current) => acc + current, 0);
        const newLapTime = time - totalPreviousLaps;
        setLaps(prevLaps => [...prevLaps, newLapTime]);
      }, [time, laps]);


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
                    onLap={handleLap}
                />
                {/* Intentional design choice to exclude lap display from StopWatch component, laps appear beneath buttons for better UX as buttons are fixed in position.
                Should be refactored into separate LapList component, however left un-factored to maintain given directory structure. */}
                <div className="laps">
                    {[...laps].reverse().map((lap, index) => ( 
                        <div key={index} className="lap-item"> {/* Reverse lap list to display most recent lap on top. */}
                            <span>Lap {laps.length - index}</span>
                            <span>{formatTime(lap)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
