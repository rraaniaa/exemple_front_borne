import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localeConfig, type Locale } from '@/i18n/translations';

const locales: Locale[] = ['fr', 'ar', 'en', 'es'];

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return (
    <div ref={ref} className="relative z-30">
      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg hover:bg-white/15 transition-colors"
      >
        <Globe className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white/80" />
        <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
          {localeConfig[locale].short}
        </span>
        <span className="text-base sm:text-lg leading-none">{localeConfig[locale].flag}</span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2.5 w-48 sm:w-52 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden"
          >
            {locales.map((loc, i) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <motion.button
                  key={loc}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    setLocale(loc);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 sm:py-3.5 text-left transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  } ${i < locales.length - 1 ? 'border-b border-white/8' : ''}`}
                >
                  <span className="text-lg sm:text-xl leading-none">{config.flag}</span>
                  <span className="flex-1 text-sm sm:text-[0.9rem] font-medium">{config.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="lang-check"
                      className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
