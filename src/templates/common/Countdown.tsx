import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  primaryColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, primaryColor = '#d30f0f' }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num: number) => String(num).padStart(2, '0');

  const timeItems = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex justify-center gap-4 py-6 md:gap-6">
      {timeItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold shadow-md border border-[#e5dfd3] md:h-20 md:w-20 md:text-3xl"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: primaryColor === '#d30f0f' ? '#111111' : primaryColor,
            }}
          >
            {padZero(item.value)}
          </div>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#5e5a52] md:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
export default Countdown;
