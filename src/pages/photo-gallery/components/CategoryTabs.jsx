import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange, photoCounts }) => {
  const categories = [
    {
      id: 'all',
      label: 'Semua Foto',
      icon: 'Images',
      count: photoCounts?.all || 0
    },
    {
      id: 'graduation',
      label: 'Foto Wisuda',
      icon: 'GraduationCap',
      count: photoCounts?.graduation || 0
    },
    {
      id: 'campus',
      label: 'Foto Kampus',
      icon: 'Building2',
      count: photoCounts?.campus || 0
    },
    {
      id: 'family',
      label: 'Foto Keluarga',
      icon: 'Users',
      count: photoCounts?.family || 0
    },
    {
      id: 'others',
      label: 'Lainnya',
      icon: 'MoreHorizontal',
      count: photoCounts?.others || 0
    }
  ];

  return (
    <div className="border-b border-border">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === category?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={category?.icon} size={18} />
            <span>{category?.label}</span>
            {category?.count > 0 && (
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;