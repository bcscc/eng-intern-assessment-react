import React from 'react';
import {formatTime} from './utils';

interface StopWatchProps {
    time: number;
}

// StopWatch component displays the millisecond time in a formatted string (HH:MM:SS.xx).
const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
    return (
        <div>
            <div className="display">{formatTime(time)}</div>
        </div>
    )
}

export default StopWatch;