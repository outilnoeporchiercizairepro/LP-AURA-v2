import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      const difference = endOfMonth.getTime() - now.getTime();

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
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Jours' },
    { value: timeLeft.hours, label: 'Heures' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Secondes' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-red-400/5 animate-pulse" />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-orange-400 animate-bounce" />
          <h3 className="text-lg font-bold text-white text-center">
            Offre Bonus se termine dans :
          </h3>
          <Gift className="w-5 h-5 text-orange-400 animate-bounce" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-3 border border-orange-500/20 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl" />
                <div className="relative text-center">
                  <motion.div
                    key={unit.value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 mb-1"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    {unit.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-orange-400 text-sm">
          <Clock className="w-4 h-4 animate-pulse" />
          <p className="font-semibold">
            Jusqu'à la fin du mois de {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default CountdownTimer;
