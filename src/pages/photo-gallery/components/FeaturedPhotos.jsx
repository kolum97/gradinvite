import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedPhotos = ({ featuredPhotos, onPhotoSelect, onRemoveFeatured }) => {
  if (featuredPhotos?.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <Icon name="Star" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium text-foreground mb-2">Belum ada foto unggulan</h3>
        <p className="text-muted-foreground">
          Pilih foto terbaik Anda untuk ditampilkan di undangan
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-secondary" />
          <span>Foto Unggulan</span>
        </h3>
        <span className="text-sm text-muted-foreground">
          {featuredPhotos?.length} foto dipilih
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredPhotos?.map((photo, index) => (
          <div key={photo?.id} className="relative group">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer">
              <Image
                src={photo?.url}
                alt={photo?.caption || 'Foto unggulan'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onClick={() => onPhotoSelect(photo)}
              />
            </div>

            {/* Featured badge */}
            <div className="absolute top-2 left-2">
              <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>{index + 1}</span>
              </div>
            </div>

            {/* Remove button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={() => onRemoveFeatured(photo?.id)}
                className="w-6 h-6 p-0"
              />
            </div>

            {/* Photo info */}
            <div className="mt-2">
              {photo?.caption && (
                <p className="text-sm font-medium text-foreground truncate">
                  {photo?.caption}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {new Date(photo.uploadDate)?.toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Tips Foto Unggulan</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pilih foto dengan kualitas terbaik untuk undangan</li>
              <li>• Maksimal 8 foto unggulan yang akan ditampilkan</li>
              <li>• Foto unggulan akan muncul di galeri utama undangan</li>
              <li>• Seret untuk mengubah urutan tampilan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPhotos;