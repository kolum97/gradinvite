import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoUploadSection = ({ formData, handleInputChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const file = e?.dataTransfer?.files?.[0];
      if (file?.type?.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          handleInputChange('graduatePhoto', event?.target?.result);
        };
        reader?.readAsDataURL(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange('graduatePhoto', event?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const samplePhotos = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  ];

  const universityPhotos = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=150&fit=crop',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=150&fit=crop'
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
          <span className="text-warning-foreground font-semibold text-lg">5</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Upload Foto</h3>
          <p className="text-sm text-muted-foreground">Tambahkan foto untuk mempercantik undangan</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Graduate Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Foto Wisudawan
          </label>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {formData?.graduatePhoto ? (
                <div className="space-y-3">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={formData?.graduatePhoto}
                      alt="Foto wisudawan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Ganti Foto
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Icon name="Upload" size={32} className="mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Upload foto Anda</p>
                    <p className="text-xs text-muted-foreground">
                      Drag & drop atau klik untuk memilih
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG hingga 5MB
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-3">Atau pilih foto contoh:</p>
              <div className="grid grid-cols-2 gap-3">
                {samplePhotos?.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('graduatePhoto', photo)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      formData?.graduatePhoto === photo
                        ? 'border-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`Contoh foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* University Background Photos */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Foto Latar Belakang Universitas
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {universityPhotos?.map((photo, index) => (
              <button
                key={index}
                onClick={() => handleInputChange('universityPhoto', photo)}
                className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                  formData?.universityPhoto === photo
                    ? 'border-primary shadow-ceremonial'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={photo}
                  alt={`Foto universitas ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {formData?.universityPhoto === photo && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={14} color="white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Tips */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Camera" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">Tips Foto Terbaik</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Gunakan foto dengan pencahayaan yang baik</li>
                <li>• Pastikan wajah terlihat jelas dan tidak buram</li>
                <li>• Pilih foto dengan latar belakang yang tidak terlalu ramai</li>
                <li>• Gunakan foto terbaru untuk hasil yang optimal</li>
                <li>• Format yang disarankan: JPG atau PNG dengan resolusi tinggi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadSection;