import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PhotoUploadModal from './components/PhotoUploadModal';
import PhotoGrid from './components/PhotoGrid';
import PhotoViewer from './components/PhotoViewer';
import CategoryTabs from './components/CategoryTabs';
import FeaturedPhotos from './components/FeaturedPhotos';
import PhotoSearch from './components/PhotoSearch';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'featured'

  // Mock data for photos
  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
      caption: "Foto wisuda dengan keluarga tercinta",
      category: "Foto Wisuda",
      categoryId: "graduation",
      uploadDate: "2024-09-08T10:30:00Z",
      views: 45,
      likes: 12,
      isFeatured: true
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500",
      caption: "Momen bahagia di hari wisuda",
      category: "Foto Wisuda",
      categoryId: "graduation",
      uploadDate: "2024-09-08T11:15:00Z",
      views: 38,
      likes: 8,
      isFeatured: true
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1562774053-701939374585?w=500",
      caption: "Gedung kampus tempat menuntut ilmu",
      category: "Foto Kampus",
      categoryId: "campus",
      uploadDate: "2024-09-07T14:20:00Z",
      views: 22,
      likes: 5,
      isFeatured: false
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500",
      caption: "Perpustakaan kampus kesayangan",
      category: "Foto Kampus",
      categoryId: "campus",
      uploadDate: "2024-09-07T15:45:00Z",
      views: 18,
      likes: 3,
      isFeatured: false
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500",
      caption: "Foto bersama keluarga besar",
      category: "Foto Keluarga",
      categoryId: "family",
      uploadDate: "2024-09-06T16:30:00Z",
      views: 67,
      likes: 18,
      isFeatured: true
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500",
      caption: "Makan malam perayaan wisuda",
      category: "Lainnya",
      categoryId: "others",
      uploadDate: "2024-09-06T19:00:00Z",
      views: 31,
      likes: 9,
      isFeatured: false
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500",
      caption: "Sesi foto dengan teman-teman",
      category: "Foto Wisuda",
      categoryId: "graduation",
      uploadDate: "2024-09-05T13:15:00Z",
      views: 42,
      likes: 11,
      isFeatured: false
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      caption: "Auditorium tempat wisuda berlangsung",
      category: "Foto Kampus",
      categoryId: "campus",
      uploadDate: "2024-09-05T09:30:00Z",
      views: 25,
      likes: 6,
      isFeatured: false
    }
  ];

  useEffect(() => {
    setPhotos(mockPhotos);
    setFilteredPhotos(mockPhotos);
  }, []);

  // Calculate photo counts by category
  const photoCounts = {
    all: photos?.length,
    graduation: photos?.filter(p => p?.categoryId === 'graduation')?.length,
    campus: photos?.filter(p => p?.categoryId === 'campus')?.length,
    family: photos?.filter(p => p?.categoryId === 'family')?.length,
    others: photos?.filter(p => p?.categoryId === 'others')?.length
  };

  const featuredPhotos = photos?.filter(photo => photo?.isFeatured);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos?.filter(photo => photo?.categoryId === category));
    }
  };

  const handleUpload = (files, category) => {
    const newPhotos = files?.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      caption: `Foto baru - ${file?.name}`,
      category: getCategoryLabel(category),
      categoryId: category,
      uploadDate: new Date()?.toISOString(),
      views: 0,
      likes: 0,
      isFeatured: false
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    
    if (activeCategory === 'all' || activeCategory === category) {
      setFilteredPhotos(updatedPhotos?.filter(photo => 
        activeCategory === 'all' || photo?.categoryId === activeCategory
      ));
    }
  };

  const getCategoryLabel = (categoryId) => {
    const categoryMap = {
      graduation: 'Foto Wisuda',
      campus: 'Foto Kampus',
      family: 'Foto Keluarga',
      others: 'Lainnya'
    };
    return categoryMap?.[categoryId] || 'Lainnya';
  };

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
    setIsViewerOpen(true);
  };

  const handlePhotoDelete = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    setPhotos(updatedPhotos);
    setFilteredPhotos(filteredPhotos?.filter(photo => photo?.id !== photoId));
  };

  const handleSetFeatured = (photoId) => {
    const updatedPhotos = photos?.map(photo =>
      photo?.id === photoId ? { ...photo, isFeatured: !photo?.isFeatured } : photo
    );
    setPhotos(updatedPhotos);
    setFilteredPhotos(filteredPhotos?.map(photo =>
      photo?.id === photoId ? { ...photo, isFeatured: !photo?.isFeatured } : photo
    ));
  };

  const handleRemoveFeatured = (photoId) => {
    const updatedPhotos = photos?.map(photo =>
      photo?.id === photoId ? { ...photo, isFeatured: false } : photo
    );
    setPhotos(updatedPhotos);
    setFilteredPhotos(filteredPhotos?.map(photo =>
      photo?.id === photoId ? { ...photo, isFeatured: false } : photo
    ));
  };

  const handleUpdateCaption = (photoId, newCaption) => {
    const updatedPhotos = photos?.map(photo =>
      photo?.id === photoId ? { ...photo, caption: newCaption } : photo
    );
    setPhotos(updatedPhotos);
    setFilteredPhotos(filteredPhotos?.map(photo =>
      photo?.id === photoId ? { ...photo, caption: newCaption } : photo
    ));
    setSelectedPhoto(prev => prev?.id === photoId ? { ...prev, caption: newCaption } : prev);
  };

  const handleNextPhoto = () => {
    const currentIndex = photos?.findIndex(p => p?.id === selectedPhoto?.id);
    const nextIndex = (currentIndex + 1) % photos?.length;
    setSelectedPhoto(photos?.[nextIndex]);
  };

  const handlePrevPhoto = () => {
    const currentIndex = photos?.findIndex(p => p?.id === selectedPhoto?.id);
    const prevIndex = currentIndex === 0 ? photos?.length - 1 : currentIndex - 1;
    setSelectedPhoto(photos?.[prevIndex]);
  };

  const handleSearch = (searchTerm) => {
    let filtered = photos;
    
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(photo => photo?.categoryId === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered?.filter(photo =>
        photo?.caption?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    
    setFilteredPhotos(filtered);
  };

  const handleFilter = (filterType, filterValue) => {
    let filtered = photos;
    
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(photo => photo?.categoryId === activeCategory);
    }
    
    if (filterType === 'date' && filterValue !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterValue) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setDate(now?.getDate() - 30);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear(), 0, 1);
          break;
        default:
          break;
      }
      
      filtered = filtered?.filter(photo => new Date(photo.uploadDate) >= filterDate);
    }
    
    setFilteredPhotos(filtered);
  };

  const handleSort = (sortBy) => {
    const sorted = [...filteredPhotos]?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest':
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'name':
          return (a?.caption || '')?.localeCompare(b?.caption || '');
        case 'views':
          return (b?.views || 0) - (a?.views || 0);
        case 'likes':
          return (b?.likes || 0) - (a?.likes || 0);
        default:
          return 0;
      }
    });
    setFilteredPhotos(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Galeri Foto
            </h1>
            <p className="text-muted-foreground">
              Kelola dan atur foto-foto wisuda Anda untuk undangan digital
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                iconName="Grid3X3"
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'featured' ? 'default' : 'ghost'}
                size="sm"
                iconName="Star"
                onClick={() => setViewMode('featured')}
              />
            </div>
            
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Foto
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Images" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{photos?.length}</p>
                <p className="text-sm text-muted-foreground">Total Foto</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="Star" size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{featuredPhotos?.length}</p>
                <p className="text-sm text-muted-foreground">Foto Unggulan</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Eye" size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {photos?.reduce((sum, photo) => sum + (photo?.views || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {photos?.reduce((sum, photo) => sum + (photo?.likes || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </div>
            </div>
          </div>
        </div>

        {viewMode === 'featured' ? (
          /* Featured Photos View */
          (<div className="space-y-8">
            <FeaturedPhotos
              featuredPhotos={featuredPhotos}
              onPhotoSelect={handlePhotoSelect}
              onRemoveFeatured={handleRemoveFeatured}
            />
          </div>)
        ) : (
          /* Grid View */
          (<div className="space-y-6">
            {/* Search and Filters */}
            <PhotoSearch
              onSearch={handleSearch}
              onFilter={handleFilter}
              onSort={handleSort}
            />
            {/* Category Tabs */}
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              photoCounts={photoCounts}
            />
            {/* Photo Grid */}
            <PhotoGrid
              photos={filteredPhotos}
              onPhotoSelect={handlePhotoSelect}
              onPhotoDelete={handlePhotoDelete}
              onSetFeatured={handleSetFeatured}
            />
          </div>)
        )}

        {/* Empty State */}
        {filteredPhotos?.length === 0 && photos?.length > 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">Tidak ada foto ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => {
                setActiveCategory('all');
                setFilteredPhotos(photos);
              }}
            >
              Reset Filter
            </Button>
          </div>
        )}
      </main>
      {/* Upload Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
      {/* Photo Viewer */}
      <PhotoViewer
        photo={selectedPhoto}
        photos={photos}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onUpdateCaption={handleUpdateCaption}
        onDelete={handlePhotoDelete}
      />
    </div>
  );
};

export default PhotoGallery;