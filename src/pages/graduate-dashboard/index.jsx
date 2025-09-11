import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import StatsCard from './components/StatsCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import CountdownTimer from './components/CountdownTimer';
import RecentMessages from './components/RecentMessages';
import CeremonyDetails from './components/CeremonyDetails';
import RSVPChart from './components/RSVPChart';
import PaymentStatus from './components/PaymentStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GraduateDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const dashboardStats = [
    {
      title: "Total RSVP",
      value: "75",
      icon: "Users",
      color: "primary",
      trend: { type: "increase", value: 12 },
      description: "dari 75 undangan terkirim"
    },
    {
      title: "Konfirmasi Hadir",
      value: "45",
      icon: "UserCheck",
      color: "success",
      trend: { type: "increase", value: 8 },
      description: "tamu akan hadir"
    },
    {
      title: "Menunggu Konfirmasi",
      value: "22",
      icon: "Clock",
      color: "warning",
      description: "belum memberikan konfirmasi"
    },
    {
      title: "Pesan Diterima",
      value: "38",
      icon: "MessageCircle",
      color: "accent",
      trend: { type: "increase", value: 15 },
      description: "ucapan selamat"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Selamat Datang, Sarah! 🎓
              </h1>
              <p className="text-muted-foreground">
                Kelola undangan wisuda Anda dan pantau perkembangan RSVP tamu
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Terakhir diperbarui: {currentTime?.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Download">
                Export Data
              </Button>
              <Button variant="default" size="sm" iconName="Share2">
                Bagikan
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats?.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat?.title}
              value={stat?.value}
              icon={stat?.icon}
              color={stat?.color}
              trend={stat?.trend}
              description={stat?.description}
            />
          ))}
        </div>

        {/* Quick Actions Panel */}
        <div className="mb-8">
          <QuickActionsPanel />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Countdown & Messages */}
          <div className="lg:col-span-2 space-y-8">
            <CountdownTimer />
            <RecentMessages />
          </div>

          {/* Right Column - Details & Chart */}
          <div className="space-y-8">
            <CeremonyDetails />
            <RSVPChart />
          </div>
        </div>

        {/* Bottom Section - Payment Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PaymentStatus />
          </div>
          
          {/* Additional Info Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">Statistik Minggu Ini</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">RSVP Baru</span>
                  <span className="text-sm font-semibold text-success">+12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pesan Baru</span>
                  <span className="text-sm font-semibold text-accent">+8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Foto Diunggah</span>
                  <span className="text-sm font-semibold text-secondary">+5</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Lightbulb" size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">Tips Hari Ini</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Jangan lupa untuk mengirim pengingat RSVP kepada tamu yang belum mengkonfirmasi kehadiran mereka.
              </p>
              <Button variant="outline" size="sm" fullWidth iconName="Send" iconPosition="left">
                Kirim Pengingat
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GraduateDashboard;