import { motion } from 'framer-motion';
import { categories } from '@/data/mockData';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <div className="kiosk-sidebar flex flex-col gap-2 px-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
        >
          <span className="text-2xl mb-1">{category.icon}</span>
          <span className="text-xs font-medium text-center leading-tight">
            {category.name}
          </span>
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary rounded-xl -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
