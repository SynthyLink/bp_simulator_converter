import React, { useState, useEffect } from 'react';

const Watch: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 10000);

        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setTime(new Date());
    };

    return (
        <div>
            <h2>It is {time.toLocaleTimeString()}.</h2>
        </div>
    );
};

export default Watch;
