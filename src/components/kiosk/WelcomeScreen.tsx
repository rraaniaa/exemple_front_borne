import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { welcomeMedia } from '@/data/mockData';
import { ChevronDown, Utensils, ShoppingBag, ShieldCheck, Timer, ScanFace } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface WelcomeScreenProps {
  onStart: (orderType: 'dine-in' | 'takeaway') => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showOrderChoice, setShowOrderChoice] = useState(false);
  const { t, dir } = useLanguage();

  useEffect(() => {
    if (welcomeMedia.length > 1) {
      const timer = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % welcomeMedia.length);
      }, welcomeMedia[currentMediaIndex].duration || 5000);
      return () => clearInterval(timer);
    }
  }, [currentMediaIndex]);

  const currentMedia = welcomeMedia[currentMediaIndex];

  return (
    <div className="welcome-screen relative" dir={dir}>
      <div className="absolute top-6 left-6 z-20">
        <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 shadow-strong">
          <span className="text-[0.6rem] tracking-[0.45em] uppercase text-white/60">{t.selfService}</span>
        </div>
      </div>

      {/* Language Selector - top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector />
      </div>
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMedia.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
          )}
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_55%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-10 sm:pb-16 md:pb-20 px-4">
        <AnimatePresence mode="wait">
          {!showOrderChoice ? (
            <motion.div
              key="touch-to-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl w-full"
            >
              <motion.button
                onClick={() => setShowOrderChoice(true)}
                className="group flex flex-col items-center gap-4 sm:gap-5 md:gap-7 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 tracking-tight">
                    {t.touchToOrder}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-white/70 tracking-wide">
                    {t.quickSimpleSecure}
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white/60" />
                </motion.div>
              </motion.button>
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-[0.6rem] sm:text-[0.65rem] text-white/70">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200" /> {t.securePayment}
                </span>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200" /> {t.quickOrder}
                </span>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <ScanFace className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200" /> {t.contactless}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="order-choice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-5 sm:gap-6 md:gap-8 px-4 w-full max-w-xl"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight text-center">
                {t.chooseOrderOption}
              </h2>
              <div className="flex flex-row gap-4 sm:gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('dine-in')}
                  className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-strong flex-1 min-w-0 border border-white/10"
                >
                  <Utensils className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-200" />
                  <div className="text-center">
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-white">{t.dineIn}</p>
                    <p className="text-[10px] sm:text-xs text-white/60">{t.dineInDesc}</p>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('takeaway')}
                  className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-strong flex-1 min-w-0 border border-white/10"
                >
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-200" />
                  <div className="text-center">
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-white">{t.takeaway}</p>
                    <p className="text-[10px] sm:text-xs text-white/60">{t.takeawayDesc}</p>
                  </div>
                </motion.button>
              </div>
              <button
                onClick={() => setShowOrderChoice(false)}
                className="text-white/60 hover:text-white underline"
              >
                {t.back}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Media indicators */}
      {welcomeMedia.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {welcomeMedia.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentMediaIndex ? 'bg-primary w-6' : 'bg-primary-foreground/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
