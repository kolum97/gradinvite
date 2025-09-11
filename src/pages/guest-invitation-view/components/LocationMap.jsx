import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ location }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleDirections = (service) => {
    const encodedAddress = encodeURIComponent(location?.fullAddress);
    const urls = {
      google: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      waze: `https://waze.com/ul?q=${encodedAddress}`,
      gojek: `gojek://route?destination=${location?.latitude},${location?.longitude}`,
      grab: `grab://route?destination=${location?.latitude},${location?.longitude}`
    };
    
    window.open(urls?.[service], '_blank');
  };

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-6">
        <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Lokasi Wisuda
        </h2>
        <p className="font-body text-muted-foreground">
          Temukan rute terbaik menuju lokasi acara wisuda
        </p>
      </div>
      {/* Location Details */}
      <div className="bg-muted rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <Icon name="Building" size={24} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{location?.venue}</h3>
            <p className="font-body text-muted-foreground mb-2">{location?.fullAddress}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Car" size={16} />
                <span>Parkir tersedia</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Accessibility" size={16} />
                <span>Akses difabel</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Wifi" size={16} />
                <span>WiFi gratis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Interactive Map */}
      <div className="relative bg-muted rounded-lg overflow-hidden mb-6" style={{ height: '300px' }}>
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <Icon name="MapPin" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="font-body text-muted-foreground mb-4">Klik untuk memuat peta</p>
              <Button
                variant="default"
                onClick={() => setIsMapLoaded(true)}
                iconName="Map"
                iconPosition="left"
              >
                Tampilkan Peta
              </Button>
            </div>
          </div>
        )}
        
        {isMapLoaded && (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={location?.venue}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=15&output=embed`}
            className="border-0"
          />
        )}
      </div>
      {/* Direction Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDirections('google')}
          iconName="Navigation"
          iconPosition="left"
          className="justify-center"
        >
          Google Maps
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDirections('waze')}
          iconName="Route"
          iconPosition="left"
          className="justify-center"
        >
          Waze
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDirections('gojek')}
          iconName="Car"
          iconPosition="left"
          className="justify-center"
        >
          Gojek
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDirections('grab')}
          iconName="Truck"
          iconPosition="left"
          className="justify-center"
        >
          Grab
        </Button>
      </div>
      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Estimasi perjalanan: 15-30 menit dari pusat kota</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Phone" size={16} />
            <span>Info lokasi: {location?.contactPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;