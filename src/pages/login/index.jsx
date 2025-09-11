import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import GraduationBackground from './components/GraduationBackground';
import UniversityPartners from './components/UniversityPartners';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/graduate-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Login Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
          <LoginForm />
        </div>

        {/* Right Side - Graduation Background (Desktop Only) */}
        <GraduationBackground />
      </div>
      {/* University Partners Section (Mobile Only) */}
      <div className="lg:hidden bg-muted/30 py-12 px-4 sm:px-6">
        <UniversityPartners />
      </div>
      {/* University Partners Section (Desktop) */}
      <div className="hidden lg:block bg-muted/30 py-16 px-8">
        <UniversityPartners />
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground font-caption">
                © {new Date()?.getFullYear()} GradInvite. Semua hak dilindungi.
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-micro font-caption">
                Syarat & Ketentuan
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-micro font-caption">
                Kebijakan Privasi
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-micro font-caption">
                Bantuan
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;