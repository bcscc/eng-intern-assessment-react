import React, { useEffect, useState } from 'react'
import './App.css';

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

    return (
        <div className="App">
            <div className="stopwatch-container">
                <div className="display">{time}</div> {/* Display current time */}
                <div className="buttons">
                    <button onClick={() => setIsRunning(true)}>Start</button> {/* Start button */}
                    <button onClick={() => setIsRunning(false)}>Stop</button> {/* Stop button */}
                </div>
            </div>
        </div>
    )
};

export default App;
