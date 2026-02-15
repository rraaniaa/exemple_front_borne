import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { welcomeMedia } from '@/data/mockData';
import { ChevronDown, Utensils, ShoppingBag, ShieldCheck, Timer, ScanFace } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (orderType: 'dine-in' | 'takeaway') => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showOrderChoice, setShowOrderChoice] = useState(false);

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
    <div className="welcome-screen relative">
      <div className="absolute top-6 left-6 z-20">
        <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 shadow-strong">
          <span className="text-[0.6rem] tracking-[0.45em] uppercase text-white/60">Self‑Service</span>
        </div>
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
              src={currentMedia.url}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-slate-950/25 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.14),_transparent_55%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20">
        <AnimatePresence mode="wait">
          {!showOrderChoice ? (
            <motion.div
              key="touch-to-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl"
            >
              <motion.button
                onClick={() => setShowOrderChoice(true)}
                className="group flex flex-col items-center gap-7"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <h1 className="text-4xl sm:text-6xl font-semibold text-white mb-2 tracking-tight">
                    Touchez pour commander
                  </h1>
                  <p className="text-sm sm:text-base text-white/70 tracking-wide">
                    Rapide · Simple · Sécurisé
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-9 h-9 text-white/60" />
                </motion.div>
              </motion.button>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[0.65rem] text-white/70">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <ShieldCheck className="w-4 h-4 text-red-200" /> Paiement sécurisé
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <Timer className="w-4 h-4 text-red-200" /> Commande rapide
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg">
                  <ScanFace className="w-4 h-4 text-red-200" /> Sans contact
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="order-choice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8"
            >
              <h2 className="text-3xl font-semibold text-white tracking-tight">
                Choisissez votre option de commande
              </h2>
              <div className="flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('dine-in')}
                  className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-strong min-w-[220px] border border-white/10"
                >
                  <Utensils className="w-9 h-9 text-red-200" />
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">Sur place</p>
                    <p className="text-xs text-white/60">Consommer sur place</p>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('takeaway')}
                  className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-strong min-w-[220px] border border-white/10"
                >
                  <ShoppingBag className="w-9 h-9 text-red-200" />
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">À emporter</p>
                    <p className="text-xs text-white/60">Commande à emporter</p>
                  </div>
                </motion.button>
              </div>
              <button
                onClick={() => setShowOrderChoice(false)}
                className="text-white/60 hover:text-white underline"
              >
                Retour
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
