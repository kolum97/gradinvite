import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status from localStorage or context
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    closeMobileMenu();
  };

  const graduateNavItems = [
    { label: 'Dashboard', path: '/graduate-dashboard', icon: 'LayoutDashboard' },
    { label: 'Buat Undangan', path: '/create-invitation', icon: 'Plus' },
    { label: 'Galeri Foto', path: '/photo-gallery', icon: 'Images' },
    { label: 'Pesan & Ucapan', path: '/messages-and-wishes', icon: 'MessageCircle' },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const isGuestView = location?.pathname === '/guest-invitation-view';
  const isLoginPage = location?.pathname === '/login';

  if (isGuestView) {
    return (
      <header className="bg-background border-b border-border shadow-ceremonial sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-semibold text-lg text-foreground">GradInvite</span>
                  <span className="font-caption text-xs text-muted-foreground">Undangan Wisuda Digital</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
                Bagikan
              </Button>
              <Button variant="default" size="sm" iconName="Calendar" iconPosition="left">
                RSVP
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background border-b border-border shadow-ceremonial sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/graduate-dashboard" : "/"} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg text-foreground">GradInvite</span>
                <span className="font-caption text-xs text-muted-foreground">Undangan Wisuda Digital</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && !isLoginPage && (
            <nav className="hidden md:flex items-center space-x-8">
              {graduateNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro hover-lift ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-ceremonial'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="Bell" className="relative">
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse-gentle"></span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout} iconName="LogOut" iconPosition="left">
                  Keluar
                </Button>
              </div>
            ) : (
              !isLoginPage && (
                <Link to="/login">
                  <Button variant="default" size="sm" iconName="LogIn" iconPosition="left">
                    Masuk
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              className="p-2"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  {graduateNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-micro ${
                        isActiveRoute(item?.path)
                          ? 'bg-primary text-primary-foreground shadow-ceremonial'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full transition-micro"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </>
              ) : (
                !isLoginPage && (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Masuk</span>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;