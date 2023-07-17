import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
    }

    // calculate time left
    const days = padWithLeadingZeros(Math.floor(countDown / (1000 * 60 * 60 * 24)), 2);
    const hours = padWithLeadingZeros(Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ), 2);
    const minutes = padWithLeadingZeros(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)), 2);
    const seconds = padWithLeadingZeros(Math.floor((countDown % (1000 * 60)) / 1000), 2);

    return [days, hours, minutes, seconds];
};

export { useCountdown };