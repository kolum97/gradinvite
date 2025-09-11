import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const RecentMessages = () => {
  const navigate = useNavigate();

  const recentMessages = [
    {
      id: 1,
      name: "Ibu Sari Wijaya",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      message: "Selamat ya nak! Ibu sangat bangga dengan pencapaianmu. Semoga sukses selalu di masa depan.",
      timestamp: "2 jam yang lalu",
      isFamily: true
    },
    {
      id: 2,
      name: "Dr. Ahmad Hidayat",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      message: "Congratulations on your graduation! Your dedication and hard work have truly paid off.",
      timestamp: "5 jam yang lalu",
      isFamily: false
    },
    {
      id: 3,
      name: "Rina Kusuma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      message: "Selamat wisuda bestie! Akhirnya kita lulus juga. Bangga banget sama kamu!",
      timestamp: "1 hari yang lalu",
      isFamily: false
    },
    {
      id: 4,
      name: "Pak Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      message: "Selamat atas kelulusanmu! Semoga ilmu yang didapat bermanfaat untuk masyarakat.",
      timestamp: "2 hari yang lalu",
      isFamily: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Pesan Terbaru</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName="MessageCircle"
          onClick={() => navigate('/messages-and-wishes')}
        >
          Lihat Semua
        </Button>
      </div>
      <div className="space-y-4">
        {recentMessages?.map((message) => (
          <div key={message?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-micro">
            <div className="relative">
              <Image
                src={message?.avatar}
                alt={message?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {message?.isFamily && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={10} color="white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">{message?.name}</h4>
                <span className="text-xs text-muted-foreground">{message?.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{message?.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          fullWidth 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => navigate('/messages-and-wishes')}
        >
          Kelola Semua Pesan
        </Button>
      </div>
    </div>
  );
};

export default RecentMessages;