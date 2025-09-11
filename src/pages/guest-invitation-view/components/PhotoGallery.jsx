import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % photos?.length 
      : (currentIndex - 1 + photos?.length) % photos?.length;
    
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos?.[newIndex]);
  };

  const sharePhoto = (photo) => {
    if (navigator.share) {
      navigator.share({
        title: 'Foto Wisuda',
        text: photo?.caption,
        url: photo?.url
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Lihat foto wisuda: ${photo?.caption} ${photo?.url}`)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-8">
        <Icon name="Images" size={32} className="mx-auto mb-3 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Galeri Foto
        </h2>
        <p className="font-body text-muted-foreground">
          Koleksi momen berharga perjalanan akademik
        </p>
      </div>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {photos?.map((photo, index) => (
          <div
            key={photo?.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-ceremonial hover:shadow-ceremonial-lg transition-micro hover-lift"
            onClick={() => openLightbox(photo, index)}
          >
            <div className="aspect-square">
              <Image
                src={photo?.thumbnail}
                alt={photo?.caption}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <Icon 
                name="ZoomIn" 
                size={24} 
                color="white" 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Photo Type Badge */}
            {photo?.type && (
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-caption">
                  {photo?.type}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center">
        <Button
          variant="outline"
          iconName="Eye"
          iconPosition="left"
        >
          Lihat Semua Foto ({photos?.length})
        </Button>
      </div>
      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              iconName="X"
            />

            {/* Navigation Buttons */}
            {photos?.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigatePhoto('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                  iconName="ChevronLeft"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigatePhoto('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                  iconName="ChevronRight"
                />
              </>
            )}

            {/* Photo */}
            <div className="relative">
              <Image
                src={selectedPhoto?.url}
                alt={selectedPhoto?.caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{selectedPhoto?.caption}</h3>
                    <p className="font-caption text-sm opacity-80">{selectedPhoto?.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => sharePhoto(selectedPhoto)}
                    iconName="Share2"
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  />
                </div>
              </div>
            </div>

            {/* Photo Counter */}
            {photos?.length > 1 && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {photos?.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;