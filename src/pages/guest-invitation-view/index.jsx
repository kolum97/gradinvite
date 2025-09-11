import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import GraduateProfile from './components/GraduateProfile';
import CeremonyDetails from './components/CeremonyDetails';
import CountdownTimer from './components/CountdownTimer';
import RSVPSection from './components/RSVPSection';
import LocationMap from './components/LocationMap';
import PhotoGallery from './components/PhotoGallery';
import CongratulationsForm from './components/CongratulationsForm';
import SocialShare from './components/SocialShare';

const GuestInvitationView = () => {
  const [currentLanguage, setCurrentLanguage] = useState('id');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for the invitation
  const graduateData = {
    name: "Sari Dewi Kusuma",
    degree: "Sarjana Teknik",
    major: "Teknik Informatika",
    university: "Universitas Indonesia",
    faculty: "Fakultas Ilmu Komputer",
    batch: "2020",
    gpa: "3.85",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    personalMessage: `Dengan penuh syukur dan kebahagiaan, saya mengundang Anda untuk hadir dalam momen bersejarah wisuda saya. Perjalanan akademik selama 4 tahun ini tidak akan berarti tanpa dukungan dan doa dari orang-orang terkasih seperti Anda. Mari kita rayakan pencapaian ini bersama-sama.`
  };

  const ceremonyData = {
    date: "2025-01-15",
    dayName: "Rabu",
    time: "09:00",
    venue: "Balairung Universitas Indonesia",
    address: "Jl. Margonda Raya, Pondok Cina, Beji, Depok, Jawa Barat 16424",
    dressCode: "Formal / Batik",
    university: "Universitas Indonesia",
    faculty: "Fakultas Ilmu Komputer"
  };

  const locationData = {
    venue: "Balairung Universitas Indonesia",
    fullAddress: "Jl. Margonda Raya, Pondok Cina, Beji, Depok, Jawa Barat 16424",
    latitude: "-6.3617",
    longitude: "106.8294",
    contactPhone: "(021) 7863-5555"
  };

  const photosData = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop",
      caption: "Foto Wisuda Resmi",
      date: "15 Januari 2025",
      type: "Wisuda"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=300&fit=crop",
      caption: "Bersama Keluarga",
      date: "15 Januari 2025",
      type: "Keluarga"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=300&h=300&fit=crop",
      caption: "Kampus Universitas Indonesia",
      date: "15 Januari 2025",
      type: "Kampus"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      caption: "Bersama Teman-teman",
      date: "15 Januari 2025",
      type: "Teman"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
      caption: "Momen Bahagia",
      date: "15 Januari 2025",
      type: "Wisuda"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop",
      caption: "Suasana Wisuda",
      date: "15 Januari 2025",
      type: "Acara"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop",
      caption: "Gedung Fakultas",
      date: "15 Januari 2025",
      type: "Kampus"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=300&fit=crop",
      caption: "Persiapan Wisuda",
      date: "15 Januari 2025",
      type: "Persiapan"
    }
  ];

  const invitationShareData = {
    graduateName: graduateData?.name,
    date: "15/01/2025",
    time: "09:00",
    venue: ceremonyData?.venue
  };

  return (
    <>
      <Helmet>
        <title>Undangan Wisuda - {graduateData?.name} | GradInvite</title>
        <meta name="description" content={`Undangan wisuda ${graduateData?.name} - ${graduateData?.degree} ${graduateData?.major} dari ${graduateData?.university}`} />
        <meta property="og:title" content={`Undangan Wisuda ${graduateData?.name}`} />
        <meta property="og:description" content={`Mari hadiri wisuda ${graduateData?.name} pada ${ceremonyData?.dayName}, 15 Januari 2025`} />
        <meta property="og:image" content={graduateData?.photo} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Gradient Background */}
        <div className="bg-gradient-to-br from-primary via-accent to-secondary py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
                🎓 Undangan Wisuda 🎓
              </h1>
              <p className="font-body text-xl text-white opacity-90 mb-2">
                {graduateData?.name}
              </p>
              <p className="font-body text-lg text-white opacity-80">
                {graduateData?.degree} - {graduateData?.major}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Graduate Profile */}
          <GraduateProfile graduate={graduateData} />

          {/* Countdown Timer */}
          <CountdownTimer targetDate={ceremonyData?.date + "T" + ceremonyData?.time + ":00"} />

          {/* Ceremony Details */}
          <CeremonyDetails ceremony={ceremonyData} />

          {/* RSVP Section */}
          <RSVPSection />

          {/* Location Map */}
          <LocationMap location={locationData} />

          {/* Photo Gallery */}
          <PhotoGallery photos={photosData} />

          {/* Congratulations Form */}
          <CongratulationsForm />

          {/* Social Share */}
          <SocialShare invitationData={invitationShareData} />

          {/* Footer Message */}
          <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 text-center border border-border">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Terima Kasih atas Perhatian Anda
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Kehadiran Anda dalam momen bersejarah ini akan menjadi kebahagiaan tersendiri bagi kami. 
                Mari kita rayakan pencapaian ini bersama-sama dan ciptakan kenangan indah yang tak terlupakan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>💌</span>
                  <span>Dibuat dengan penuh cinta</span>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-2">
                  <span>🎓</span>
                  <span>GradInvite Digital Invitation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestInvitationView;