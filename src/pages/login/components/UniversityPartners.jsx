import React from 'react';
import Image from '../../../components/AppImage';

const UniversityPartners = () => {
  const universityPartners = [
    {
      id: 1,
      name: "Universitas Indonesia",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=120&h=80&fit=crop&crop=center",
      alt: "Logo Universitas Indonesia"
    },
    {
      id: 2,
      name: "Institut Teknologi Bandung",
      logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=80&fit=crop&crop=center",
      alt: "Logo Institut Teknologi Bandung"
    },
    {
      id: 3,
      name: "Universitas Gadjah Mada",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&h=80&fit=crop&crop=center",
      alt: "Logo Universitas Gadjah Mada"
    },
    {
      id: 4,
      name: "Universitas Airlangga",
      logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=120&h=80&fit=crop&crop=center",
      alt: "Logo Universitas Airlangga"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Dipercaya oleh Universitas Terkemuka
        </h3>
        <p className="text-sm text-muted-foreground font-caption">
          Lebih dari 50+ universitas di Indonesia telah menggunakan GradInvite
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {universityPartners?.map((partner) => (
          <div
            key={partner?.id}
            className="flex flex-col items-center p-4 bg-card rounded-lg border border-border hover:shadow-ceremonial transition-micro hover-lift"
          >
            <div className="w-16 h-16 mb-3 overflow-hidden rounded-lg bg-muted flex items-center justify-center">
              <Image
                src={partner?.logo}
                alt={partner?.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-center text-muted-foreground font-caption leading-tight">
              {partner?.name}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground font-caption">
          Bergabunglah dengan ribuan lulusan yang telah mempercayai platform kami
        </p>
      </div>
    </div>
  );
};

export default UniversityPartners;