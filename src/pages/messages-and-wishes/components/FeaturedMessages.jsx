import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedMessages = ({ featuredMessages, onRemoveFromFeatured, onAddToInvitation }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })?.format(new Date(date));
  };

  if (featuredMessages?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-ceremonial text-center">
        <Icon name="Star" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold text-foreground mb-2">Belum Ada Pesan Istimewa</h3>
        <p className="text-muted-foreground">
          Tandai pesan-pesan terbaik sebagai istimewa untuk ditampilkan di undangan Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Star" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Pesan Istimewa</h2>
            <p className="text-sm text-muted-foreground">
              {featuredMessages?.length} pesan terpilih untuk ditampilkan
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {featuredMessages?.map((message) => (
          <div
            key={message?.id}
            className="border border-border rounded-lg p-4 hover:shadow-ceremonial transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={message?.avatar}
                  alt={`Avatar ${message?.senderName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground">{message?.senderName}</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(message?.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddToInvitation(message?.id)}
                  iconName="Plus"
                  className="text-primary hover:text-primary"
                >
                  Tambah ke Undangan
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFromFeatured(message?.id)}
                  iconName="X"
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            </div>

            <p className="text-foreground leading-relaxed text-sm line-clamp-3">
              {message?.content}
            </p>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} className="text-error" />
                  <span>{message?.likes}</span>
                </div>
                {message?.hasReply && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>Dibalas</span>
                  </div>
                )}
              </div>
              <div className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                Istimewa
              </div>
            </div>
          </div>
        ))}
      </div>
      {featuredMessages?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Pesan istimewa akan ditampilkan di bagian khusus undangan Anda
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
          >
            Pratinjau di Undangan
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeaturedMessages;