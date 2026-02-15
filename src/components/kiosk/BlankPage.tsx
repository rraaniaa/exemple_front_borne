import { motion } from 'framer-motion';

interface BlankPageProps {
  orderType?: 'dine-in' | 'takeaway';
}

export function BlankPage({ orderType }: BlankPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-white"
    >
      <div className="absolute top-6 left-6">
        <h1 className="text-sm font-semibold text-black">BORNE</h1>
        <p className="text-xs text-black/60">test</p>
      </div>
    </motion.div>
  );
}
