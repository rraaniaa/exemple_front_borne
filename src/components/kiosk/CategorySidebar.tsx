import { motion } from 'framer-motion';
import { categories } from '@/data/mockData';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <div className="kiosk-sidebar flex flex-row md:flex-col gap-1 sm:gap-2 px-2 py-2 md:py-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`category-btn flex-shrink-0 min-w-[64px] sm:min-w-[72px] md:min-w-0 ${activeCategory === category.id ? 'active' : ''}`}
        >
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-md sm:rounded-lg mb-0.5 md:mb-1"
            />
          ) : (
            <span className="text-lg sm:text-xl md:text-2xl mb-0.5 md:mb-1">{category.icon}</span>
          )}
          <span className="text-[10px] sm:text-xs font-medium text-center leading-tight line-clamp-1 md:line-clamp-2">
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
