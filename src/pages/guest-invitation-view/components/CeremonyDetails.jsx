import React from 'react';
import Icon from '../../../components/AppIcon';

const CeremonyDetails = ({ ceremony }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Undangan Wisuda
        </h2>
        <p className="font-body text-muted-foreground">
          Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir dalam acara wisuda
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date & Time */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Tanggal</h3>
              <p className="font-body text-lg text-foreground">{formatDate(ceremony?.date)}</p>
              <p className="font-caption text-sm text-muted-foreground">{ceremony?.dayName}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Waktu</h3>
              <p className="font-body text-lg text-foreground">{formatTime(ceremony?.time)} WIB</p>
              <p className="font-caption text-sm text-muted-foreground">Harap hadir 30 menit sebelumnya</p>
            </div>
          </div>
        </div>

        {/* Location & Dress Code */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Lokasi</h3>
              <p className="font-body text-lg text-foreground">{ceremony?.venue}</p>
              <p className="font-caption text-sm text-muted-foreground">{ceremony?.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Shirt" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">Dress Code</h3>
              <p className="font-body text-lg text-foreground">{ceremony?.dressCode}</p>
              <p className="font-caption text-sm text-muted-foreground">Pakaian formal dan sopan</p>
            </div>
          </div>
        </div>
      </div>
      {/* University Logo */}
      <div className="mt-8 pt-8 border-t border-border text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="School" size={24} className="text-primary" />
          </div>
          <div className="text-left">
            <h4 className="font-heading font-semibold text-foreground">{ceremony?.university}</h4>
            <p className="font-caption text-sm text-muted-foreground">{ceremony?.faculty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeremonyDetails;