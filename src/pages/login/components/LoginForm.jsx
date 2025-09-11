import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    graduate: { email: 'graduate@gradinvite.com', password: 'graduate123' },
    guest: { email: 'guest@gradinvite.com', password: 'guest123' },
    admin: { email: 'admin@gradinvite.com', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData?.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/graduate-dashboard');
      } else {
        setErrors({
          general: 'Email atau password salah. Gunakan: graduate@gradinvite.com / graduate123'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/graduate-dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-ceremonial-lg p-8 border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-muted-foreground font-caption">
            Masuk ke akun GradInvite Anda untuk mengelola undangan wisuda
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error font-medium">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Alamat Email"
            type="email"
            name="email"
            placeholder="Masukkan email Anda"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan password Anda"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-micro">
            Lupa Password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground font-caption">
              Atau masuk dengan
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            iconName="Chrome"
            iconPosition="left"
          >
            Masuk dengan Google
          </Button>
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            iconName="Facebook"
            iconPosition="left"
          >
            Masuk dengan Facebook
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground font-caption">
            Belum punya akun?{' '}
            <button className="text-primary hover:text-primary/80 font-medium transition-micro">
              Daftar di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;