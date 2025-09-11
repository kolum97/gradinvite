import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const RSVPChart = () => {
  const rsvpData = [
    { name: 'Hadir', value: 45, color: '#059669' },
    { name: 'Tidak Hadir', value: 8, color: '#DC2626' },
    { name: 'Belum Konfirmasi', value: 22, color: '#D97706' }
  ];

  const totalInvited = rsvpData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-ceremonial">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value} orang ({((data?.value / totalInvited) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="PieChart" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-foreground">Status RSVP</h2>
      </div>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={rsvpData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {rsvpData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {rsvpData?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-sm font-medium text-foreground">{item?.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground">{item?.value}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({((item?.value / totalInvited) * 100)?.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Total Undangan</span>
          <span className="text-lg font-heading font-semibold text-foreground">{totalInvited}</span>
        </div>
      </div>
    </div>
  );
};

export default RSVPChart;