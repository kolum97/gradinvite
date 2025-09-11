import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const GraduationBackground = () => {
  const graduationImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&crop=center",
      alt: "Graduation ceremony with students in caps and gowns"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&crop=center",
      alt: "University campus building"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop&crop=center",
      alt: "Students celebrating graduation"
    }
  ];

  const features = [
    {
      icon: "Users",
      title: "Kelola Tamu",
      description: "Undang keluarga dan teman dengan mudah"
    },
    {
      icon: "Calendar",
      title: "RSVP Digital",
      description: "Konfirmasi kehadiran secara real-time"
    },
    {
      icon: "Camera",
      title: "Galeri Foto",
      description: "Bagikan momen berharga wisuda Anda"
    },
    {
      icon: "MapPin",
      title: "Lokasi Interaktif",
      description: "Peta dan petunjuk arah ke lokasi acara"
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-primary rounded-full"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center p-12 w-full">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">GradInvite</h2>
              <p className="text-sm text-muted-foreground font-caption">Undangan Wisuda Digital</p>
            </div>
          </div>
          
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
            Rayakan Pencapaian
            <br />
            <span className="text-primary">Akademik Anda</span>
          </h1>
          
          <p className="text-lg text-muted-foreground font-caption leading-relaxed mb-8">
            Platform digital terlengkap untuk membuat undangan wisuda yang elegan, 
            mengelola tamu, dan berbagi momen berharga dengan orang-orang terkasih.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 hover:shadow-ceremonial transition-micro hover-lift"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Image Gallery Preview */}
        <div className="grid grid-cols-3 gap-3">
          {graduationImages?.map((image, index) => (
            <div
              key={image?.id}
              className="aspect-square overflow-hidden rounded-lg bg-muted"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <Image
                src={image?.src}
                alt={image?.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground font-caption">Lulusan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-secondary">50+</div>
            <div className="text-xs text-muted-foreground font-caption">Universitas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">100K+</div>
            <div className="text-xs text-muted-foreground font-caption">Undangan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationBackground;