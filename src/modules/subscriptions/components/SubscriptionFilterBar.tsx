import { Search } from 'lucide-react';
import { filterBarStyles } from '@/modules/subscriptions/recipes/filterBar.recipe';

interface SubscriptionFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function SubscriptionFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: SubscriptionFilterBarProps) {
  const classes = filterBarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.searchWrapper}>
        <Search size={16} className={classes.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={classes.input}
        />
      </div>

      <div className={classes.pillsWrapper}>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={classes.pill}
              style={{
                background: isSelected ? '#1D1D1F' : undefined,
                color: isSelected ? '#FFFFFF' : undefined,
                borderColor: isSelected ? '#1D1D1F' : undefined,
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
