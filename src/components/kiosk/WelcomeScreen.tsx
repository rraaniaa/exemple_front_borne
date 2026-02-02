import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { welcomeMedia } from '@/data/mockData';
import { ChevronDown } from 'lucide-react';

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
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
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
              className="text-center"
            >
              <motion.button
                onClick={() => setShowOrderChoice(true)}
                className="group flex flex-col items-center gap-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-primary">
                    <span className="text-5xl">👆</span>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-black text-primary-foreground mb-2 text-shadow">
                    TOUCHEZ POUR COMMANDER
                  </h1>
                  <p className="text-xl text-primary-foreground/80">
                    Touch to order
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-10 h-10 text-primary-foreground/60" />
                </motion.div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="order-choice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8"
            >
              <h2 className="text-3xl font-bold text-primary-foreground text-shadow">
                Où souhaitez-vous manger ?
              </h2>
              <div className="flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('dine-in')}
                  className="flex flex-col items-center gap-4 bg-card/95 backdrop-blur-sm p-8 rounded-3xl shadow-strong min-w-[200px]"
                >
                  <span className="text-6xl">🍽️</span>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">Sur Place</p>
                    <p className="text-sm text-muted-foreground">Dine in</p>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStart('takeaway')}
                  className="flex flex-col items-center gap-4 bg-card/95 backdrop-blur-sm p-8 rounded-3xl shadow-strong min-w-[200px]"
                >
                  <span className="text-6xl">🥡</span>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">À Emporter</p>
                    <p className="text-sm text-muted-foreground">Takeaway</p>
                  </div>
                </motion.button>
              </div>
              <button
                onClick={() => setShowOrderChoice(false)}
                className="text-primary-foreground/60 hover:text-primary-foreground underline"
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
