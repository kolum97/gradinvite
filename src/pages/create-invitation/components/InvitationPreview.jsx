import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InvitationPreview = ({ formData, isVisible, onToggle }) => {
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal belum dipilih';
    const date = new Date(dateString);
    return date?.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Waktu belum dipilih';
    return timeString;
  };

  const getTemplateStyles = () => {
    const templates = {
      classic: {
        bg: 'bg-gradient-to-br from-blue-50 to-amber-50',
        border: 'border-amber-200',
        accent: 'text-blue-800',
        secondary: 'text-amber-700'
      },
      modern: {
        bg: 'bg-gradient-to-br from-purple-50 to-green-50',
        border: 'border-purple-200',
        accent: 'text-purple-700',
        secondary: 'text-green-600'
      },
      university: {
        bg: 'bg-gradient-to-br from-red-50 to-yellow-50',
        border: 'border-red-200',
        accent: 'text-red-700',
        secondary: 'text-gray-700'
      },
      floral: {
        bg: 'bg-gradient-to-br from-pink-50 to-green-50',
        border: 'border-pink-200',
        accent: 'text-pink-700',
        secondary: 'text-green-600'
      },
      geometric: {
        bg: 'bg-gradient-to-br from-blue-50 to-orange-50',
        border: 'border-blue-200',
        accent: 'text-blue-600',
        secondary: 'text-orange-600'
      },
      vintage: {
        bg: 'bg-gradient-to-br from-amber-50 to-green-50',
        border: 'border-amber-300',
        accent: 'text-amber-800',
        secondary: 'text-green-700'
      }
    };
    return templates?.[formData?.template] || templates?.classic;
  };

  const templateStyles = getTemplateStyles();

  const deviceClasses = {
    desktop: 'w-full max-w-md',
    tablet: 'w-80',
    mobile: 'w-64'
  };

  if (!isVisible) {
    return (
      <div className="lg:sticky lg:top-24">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Eye"
          iconPosition="left"
          className="w-full"
        >
          Lihat Preview
        </Button>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Preview Undangan</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName="X"
          className="lg:hidden"
        />
      </div>
      {/* Device Toggle */}
      <div className="flex items-center space-x-2 p-1 bg-muted rounded-lg">
        {[
          { key: 'desktop', icon: 'Monitor', label: 'Desktop' },
          { key: 'tablet', icon: 'Tablet', label: 'Tablet' },
          { key: 'mobile', icon: 'Smartphone', label: 'Mobile' }
        ]?.map((device) => (
          <button
            key={device?.key}
            onClick={() => setPreviewDevice(device?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
              previewDevice === device?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={device?.icon} size={14} />
            <span className="hidden sm:inline">{device?.label}</span>
          </button>
        ))}
      </div>
      {/* Preview Container */}
      <div className="flex justify-center">
        <div className={`${deviceClasses?.[previewDevice]} transition-all duration-300`}>
          <div className={`${templateStyles?.bg} ${templateStyles?.border} border-2 rounded-lg shadow-ceremonial-xl overflow-hidden`}>
            {/* Header with University Photo */}
            {formData?.universityPhoto && (
              <div className="h-32 overflow-hidden relative">
                <Image
                  src={formData?.universityPhoto}
                  alt="Universitas"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Graduate Photo */}
              {formData?.graduatePhoto && (
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-ceremonial">
                    <Image
                      src={formData?.graduatePhoto}
                      alt="Wisudawan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Graduate Info */}
              <div className="text-center space-y-2">
                <h1 className={`font-heading font-bold text-xl ${templateStyles?.accent}`}>
                  {formData?.fullName || 'Nama Lengkap'}
                </h1>
                {formData?.studentId && (
                  <p className="text-sm text-muted-foreground">
                    NIM: {formData?.studentId}
                  </p>
                )}
                <div className="space-y-1">
                  <p className={`font-medium ${templateStyles?.secondary}`}>
                    {formData?.degree || 'Jenjang'} - {formData?.major || 'Program Studi'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formData?.faculty || 'Fakultas'}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {formData?.university || 'Universitas'}
                  </p>
                </div>
                {formData?.gpa && (
                  <p className="text-sm text-muted-foreground">
                    IPK: {formData?.gpa}
                  </p>
                )}
              </div>

              {/* Ceremony Details */}
              <div className="bg-white/50 rounded-lg p-4 space-y-3">
                <h3 className={`font-semibold text-center ${templateStyles?.accent}`}>
                  Detail Acara Wisuda
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className={templateStyles?.accent} />
                    <span>{formatDate(formData?.ceremonyDate)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className={templateStyles?.accent} />
                    <span>{formatTime(formData?.ceremonyTime)} WIB</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Icon name="MapPin" size={16} className={`${templateStyles?.accent} mt-0.5`} />
                    <span className="flex-1">{formData?.location || 'Lokasi acara'}</span>
                  </div>
                  
                  {formData?.dressCode && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Shirt" size={16} className={templateStyles?.accent} />
                      <span>{formData?.dressCode}</span>
                    </div>
                  )}
                  
                  {formData?.ceremonyType && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Monitor" size={16} className={templateStyles?.accent} />
                      <span>{formData?.ceremonyType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Message */}
              {formData?.personalMessage && (
                <div className="bg-white/30 rounded-lg p-4">
                  <p className="text-sm text-center italic leading-relaxed">
                    "{formData?.personalMessage}"
                  </p>
                </div>
              )}

              {/* RSVP Button */}
              <div className="text-center">
                <button className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
                  templateStyles?.accent?.includes('blue') ? 'bg-blue-600 hover:bg-blue-700' :
                  templateStyles?.accent?.includes('purple') ? 'bg-purple-600 hover:bg-purple-700' :
                  templateStyles?.accent?.includes('red') ? 'bg-red-600 hover:bg-red-700' :
                  templateStyles?.accent?.includes('pink') ? 'bg-pink-600 hover:bg-pink-700' :
                  templateStyles?.accent?.includes('amber') ? 'bg-amber-600 hover:bg-amber-700' :
                  'bg-primary hover:bg-primary/90'
                }`}>
                  Konfirmasi Kehadiran
                </button>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-muted-foreground border-t border-border/50 pt-4">
                <p>Dibuat dengan ❤️ menggunakan GradInvite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Preview Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" iconName="Share2" iconPosition="left" className="flex-1">
          Bagikan
        </Button>
        <Button variant="default" size="sm" iconName="Download" iconPosition="left" className="flex-1">
          Download
        </Button>
      </div>
    </div>
  );
};

export default InvitationPreview;