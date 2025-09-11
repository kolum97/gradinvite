import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PhotoViewer = ({ photo, photos, isOpen, onClose, onNext, onPrev, onUpdateCaption, onDelete }) => {
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [caption, setCaption] = useState(photo?.caption || '');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (photo) {
      setCaption(photo?.caption || '');
    }
  }, [photo]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrev]);

  const handleSaveCaption = () => {
    onUpdateCaption(photo?.id, caption);
    setIsEditingCaption(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: photo?.caption || 'Foto Wisuda',
        text: `Lihat foto wisuda saya: ${photo?.caption || ''}`,
        url: photo?.url
      });
    } else {
      navigator.clipboard?.writeText(photo?.url);
    }
  };

  const currentIndex = photos?.findIndex(p => p?.id === photo?.id);
  const hasNext = currentIndex < photos?.length - 1;
  const hasPrev = currentIndex > 0;

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={onClose}
          iconName="X"
        />

        {/* Navigation buttons */}
        {hasPrev && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={onPrev}
            iconName="ChevronLeft"
          />
        )}

        {hasNext && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            onClick={onNext}
            iconName="ChevronRight"
          />
        )}

        {/* Main content */}
        <div className="flex flex-col lg:flex-row max-w-7xl w-full h-full">
          {/* Image container */}
          <div className="flex-1 flex items-center justify-center relative">
            <div
              className={`relative cursor-pointer transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={photo?.url}
                alt={photo?.caption || 'Foto wisuda'}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            
            {/* Zoom indicator */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {isZoomed ? 'Klik untuk zoom out' : 'Klik untuk zoom in'}
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:w-80 bg-background p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Photo info */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Detail Foto
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Upload:</span>
                    <span className="text-foreground">
                      {new Date(photo.uploadDate)?.toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kategori:</span>
                    <span className="text-foreground">{photo?.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dilihat:</span>
                    <span className="text-foreground">{photo?.views || 0} kali</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Disukai:</span>
                    <span className="text-foreground">{photo?.likes || 0} kali</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">Keterangan</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit2"
                    onClick={() => setIsEditingCaption(true)}
                  />
                </div>
                
                {isEditingCaption ? (
                  <div className="space-y-2">
                    <Input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e?.target?.value)}
                      placeholder="Tambahkan keterangan foto..."
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSaveCaption}
                        iconName="Check"
                        iconPosition="left"
                      >
                        Simpan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditingCaption(false);
                          setCaption(photo?.caption || '');
                        }}
                      >
                        Batal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {photo?.caption || 'Belum ada keterangan'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Share2"
                  iconPosition="left"
                  onClick={handleShare}
                >
                  Bagikan Foto
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = photo?.url;
                    link.download = `foto-wisuda-${photo?.id}.jpg`;
                    link?.click();
                  }}
                >
                  Unduh Foto
                </Button>

                <Button
                  variant="destructive"
                  fullWidth
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => {
                    if (confirm('Yakin ingin menghapus foto ini?')) {
                      onDelete(photo?.id);
                      onClose();
                    }
                  }}
                >
                  Hapus Foto
                </Button>
              </div>

              {/* Navigation info */}
              <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
                Foto {currentIndex + 1} dari {photos?.length}
                <div className="mt-2 text-xs">
                  Gunakan ← → atau swipe untuk navigasi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;