import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Pesan',
      value: stats?.totalMessages,
      icon: 'MessageCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Sudah Dibalas',
      value: stats?.repliedMessages,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Belum Dibalas',
      value: stats?.unrepliedMessages,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Tingkat Respons',
      value: `${stats?.responseRate}%`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 shadow-ceremonial hover:shadow-ceremonial-lg transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {item?.label}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {item?.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageStats;