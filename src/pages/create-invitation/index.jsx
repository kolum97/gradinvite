import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import CeremonyDetailsSection from './components/CeremonyDetailsSection';
import PersonalMessageSection from './components/PersonalMessageSection';
import TemplateSelectionSection from './components/TemplateSelectionSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import InvitationPreview from './components/InvitationPreview';

const CreateInvitation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    nickname: '',
    studentId: '',
    university: '',
    degree: '',
    major: '',
    faculty: '',
    gpa: '',
    
    // Ceremony Details
    ceremonyDate: '',
    ceremonyTime: '',
    ceremonyType: '',
    location: '',
    dressCode: '',
    streamingLink: '',
    additionalNotes: '',
    
    // Personal Message
    personalMessage: '',
    
    // Template & Photos
    template: 'classic',
    graduatePhoto: '',
    universityPhoto: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load saved draft if exists
    const savedDraft = localStorage.getItem('invitationDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [navigate]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('invitationDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!formData?.fullName?.trim()) errors.fullName = 'Nama lengkap wajib diisi';
        if (!formData?.studentId?.trim()) errors.studentId = 'NIM/NPM wajib diisi';
        if (!formData?.university) errors.university = 'Universitas wajib dipilih';
        if (!formData?.degree) errors.degree = 'Jenjang pendidikan wajib dipilih';
        if (!formData?.major?.trim()) errors.major = 'Program studi wajib diisi';
        if (!formData?.faculty?.trim()) errors.faculty = 'Fakultas wajib diisi';
        break;
        
      case 2:
        if (!formData?.ceremonyDate) errors.ceremonyDate = 'Tanggal wisuda wajib diisi';
        if (!formData?.ceremonyTime) errors.ceremonyTime = 'Waktu wisuda wajib diisi';
        if (!formData?.ceremonyType) errors.ceremonyType = 'Jenis acara wajib dipilih';
        if (!formData?.location?.trim()) errors.location = 'Lokasi acara wajib diisi';
        if (!formData?.dressCode) errors.dressCode = 'Dress code wajib dipilih';
        break;
        
      case 3:
        if (!formData?.personalMessage?.trim()) {
          errors.personalMessage = 'Pesan pribadi wajib diisi';
        } else if (formData?.personalMessage?.length > 500) {
          errors.personalMessage = 'Pesan tidak boleh lebih dari 500 karakter';
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('invitationDraft', JSON.stringify(formData));
      
      // Show success message (you can implement a toast notification here)
      alert('Draft berhasil disimpan!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Gagal menyimpan draft. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishInvitation = async () => {
    // Validate all steps
    let allValid = true;
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        allValid = false;
        setCurrentStep(step);
        break;
      }
    }

    if (!allValid) {
      alert('Mohon lengkapi semua data yang diperlukan terlebih dahulu.');
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call to publish invitation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage as published
      const publishedInvitation = {
        ...formData,
        id: Date.now(),
        status: 'published',
        createdAt: new Date()?.toISOString(),
        publishedAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('publishedInvitation', JSON.stringify(publishedInvitation));
      localStorage.removeItem('invitationDraft');
      
      // Navigate to dashboard with success message
      navigate('/graduate-dashboard', { 
        state: { message: 'Undangan berhasil dipublikasikan!' }
      });
    } catch (error) {
      console.error('Error publishing invitation:', error);
      alert('Gagal mempublikasikan undangan. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const steps = [
    { number: 1, title: 'Informasi Pribadi', icon: 'User' },
    { number: 2, title: 'Detail Acara', icon: 'Calendar' },
    { number: 3, title: 'Pesan Pribadi', icon: 'MessageSquare' },
    { number: 4, title: 'Pilih Template', icon: 'Palette' },
    { number: 5, title: 'Upload Foto', icon: 'Camera' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <CeremonyDetailsSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <PersonalMessageSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <TemplateSelectionSection
            formData={formData}
            handleSelectChange={handleSelectChange}
          />
        );
      case 5:
        return (
          <PhotoUploadSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb />
        
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
            Buat Undangan Wisuda
          </h1>
          <p className="text-muted-foreground">
            Buat undangan wisuda digital yang elegan dan personal untuk momen spesial Anda
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps?.map((step, index) => (
              <React.Fragment key={step?.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step?.number
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {currentStep > step?.number ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${
                      currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </p>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step?.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center space-x-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Sebelumnya
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  onClick={handleSaveDraft}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                >
                  Simpan Draft
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                {currentStep < 5 ? (
                  <Button
                    variant="default"
                    onClick={handleNextStep}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Selanjutnya
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handlePublishInvitation}
                    loading={isSaving}
                    iconName="Send"
                    iconPosition="left"
                  >
                    Publikasikan Undangan
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <InvitationPreview
              formData={formData}
              isVisible={showPreview || window.innerWidth >= 1024}
              onToggle={() => setShowPreview(!showPreview)}
            />
          </div>
        </div>

        {/* Mobile Preview Overlay */}
        {showPreview && window.innerWidth < 1024 && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute inset-4 bg-background rounded-lg overflow-auto">
              <div className="p-4">
                <InvitationPreview
                  formData={formData}
                  isVisible={true}
                  onToggle={() => setShowPreview(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateInvitation;