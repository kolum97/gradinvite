import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, color = "primary", trend = null, description = null }) => {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    accent: "bg-accent text-accent-foreground"
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial hover-lift transition-micro">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend?.type === 'increase' ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend?.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trend?.value}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-heading font-semibold text-foreground">{value}</h3>
        <p className="text-sm font-caption text-muted-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;