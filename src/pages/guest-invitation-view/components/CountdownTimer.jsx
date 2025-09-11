import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Hari', value: timeLeft?.days, icon: 'Calendar' },
    { label: 'Jam', value: timeLeft?.hours, icon: 'Clock' },
    { label: 'Menit', value: timeLeft?.minutes, icon: 'Timer' },
    { label: 'Detik', value: timeLeft?.seconds, icon: 'Zap' }
  ];

  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-xl shadow-ceremonial-lg p-8 mb-8 text-white">
      <div className="text-center mb-6">
        <Icon name="Clock" size={32} className="mx-auto mb-3" />
        <h2 className="font-heading text-2xl font-bold mb-2">Hitung Mundur Wisuda</h2>
        <p className="font-body opacity-90">Waktu menuju momen bersejarah</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {timeUnits?.map((unit, index) => (
          <div key={index} className="bg-white bg-opacity-20 rounded-lg p-4 text-center backdrop-blur-sm">
            <Icon name={unit?.icon} size={20} className="mx-auto mb-2 opacity-80" />
            <div className="font-heading text-2xl lg:text-3xl font-bold mb-1">
              {unit?.value?.toString()?.padStart(2, '0')}
            </div>
            <div className="font-caption text-sm opacity-80">{unit?.label}</div>
          </div>
        ))}
      </div>
      {timeLeft?.days === 0 && timeLeft?.hours === 0 && timeLeft?.minutes === 0 && timeLeft?.seconds === 0 && (
        <div className="text-center mt-6">
          <p className="font-heading text-xl font-semibold">🎉 Hari Wisuda Telah Tiba! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;