import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock graduation date - 30 days from now
  const graduationDate = new Date();
  graduationDate?.setDate(graduationDate?.getDate() + 30);
  graduationDate?.setHours(10, 0, 0, 0); // 10:00 AM

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()?.getTime();
      const distance = graduationDate?.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [graduationDate]);

  const timeUnits = [
    { label: 'Hari', value: timeLeft?.days, icon: 'Calendar' },
    { label: 'Jam', value: timeLeft?.hours, icon: 'Clock' },
    { label: 'Menit', value: timeLeft?.minutes, icon: 'Timer' },
    { label: 'Detik', value: timeLeft?.seconds, icon: 'Zap' }
  ];

  return (
    <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-6 text-white shadow-ceremonial-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="GraduationCap" size={24} />
        <h2 className="text-lg font-heading font-semibold">Countdown Wisuda</h2>
      </div>
      <p className="text-sm opacity-90 mb-6">
        {graduationDate?.toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} - 10:00 WIB
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {timeUnits?.map((unit, index) => (
          <div key={index} className="text-center">
            <div className="bg-white/20 rounded-lg p-3 mb-2">
              <Icon name={unit?.icon} size={20} className="mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">{unit?.value?.toString()?.padStart(2, '0')}</div>
            </div>
            <p className="text-xs opacity-80">{unit?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;