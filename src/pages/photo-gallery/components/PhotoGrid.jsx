import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotoGrid = ({ photos, onPhotoSelect, onPhotoDelete, onSetFeatured }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => 
      prev?.includes(photoId) 
        ? prev?.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleShare = (photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo?.caption || 'Foto Wisuda',
        text: `Lihat foto wisuda saya: ${photo?.caption || ''}`,
        url: photo?.url
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(photo?.url);
      // You could show a toast notification here
    }
  };

  if (photos?.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon name="Images" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium text-foreground mb-2">Belum ada foto</h3>
        <p className="text-muted-foreground">Upload foto pertama Anda untuk memulai galeri</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedPhotos?.length > 0 && (
        <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {selectedPhotos?.length} foto terpilih
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Star"
              iconPosition="left"
              onClick={() => {
                selectedPhotos?.forEach(id => onSetFeatured(id));
                setSelectedPhotos([]);
              }}
            >
              Jadikan Unggulan
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => {
                selectedPhotos?.forEach(id => onPhotoDelete(id));
                setSelectedPhotos([]);
              }}
            >
              Hapus
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPhotos([])}
            >
              Batal
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos?.map((photo) => (
          <div
            key={photo?.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredPhoto(photo?.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => onPhotoSelect(photo)}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={photo?.url}
                alt={photo?.caption || 'Foto wisuda'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Selection checkbox */}
            <div className="absolute top-2 left-2">
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  togglePhotoSelection(photo?.id);
                }}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPhotos?.includes(photo?.id)
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border hover:border-primary'
                }`}
              >
                {selectedPhotos?.includes(photo?.id) && (
                  <Icon name="Check" size={14} />
                )}
              </button>
            </div>

            {/* Featured badge */}
            {photo?.isFeatured && (
              <div className="absolute top-2 right-2">
                <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>Unggulan</span>
                </div>
              </div>
            )}

            {/* Hover overlay */}
            {(hoveredPhoto === photo?.id || selectedPhotos?.includes(photo?.id)) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Share2"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleShare(photo);
                    }}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Star"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onSetFeatured(photo?.id);
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Trash2"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onPhotoDelete(photo?.id);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Photo info */}
            <div className="mt-2">
              {photo?.caption && (
                <p className="text-sm font-medium text-foreground truncate">
                  {photo?.caption}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{new Date(photo.uploadDate)?.toLocaleDateString('id-ID')}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{photo?.views || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} />
                    <span>{photo?.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;