import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const CongratulationsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    relationship: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const relationshipOptions = [
    'Keluarga',
    'Teman',
    'Rekan Kerja',
    'Dosen',
    'Teman Kuliah',
    'Lainnya'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!formData?.name?.trim() || !formData?.message?.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      message: '',
      relationship: ''
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Ucapan Terkirim!
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            Terima kasih telah mengirimkan ucapan selamat. Pesan Anda sangat berarti bagi wisudawan.
          </p>
          
          {/* Submitted Message Preview */}
          <div className="bg-muted rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Icon name="Quote" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-body text-foreground mb-2 italic">"{formData?.message}"</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">{formData?.name}</span>
                  {formData?.relationship && (
                    <>
                      <span>•</span>
                      <span>{formData?.relationship}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={resetForm}
            iconName="Plus"
            iconPosition="left"
          >
            Kirim Ucapan Lain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-8">
        <Icon name="MessageCircle" size={32} className="mx-auto mb-3 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Kirim Ucapan Selamat
        </h2>
        <p className="font-body text-muted-foreground">
          Sampaikan ucapan selamat dan doa terbaik untuk wisudawan
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <Input
          label="Nama Lengkap"
          type="text"
          placeholder="Masukkan nama lengkap Anda"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          required
        />

        <div>
          <label className="block font-heading font-medium text-foreground mb-2">
            Hubungan dengan Wisudawan
          </label>
          <div className="grid grid-cols-2 gap-2">
            {relationshipOptions?.map((option) => (
              <Button
                key={option}
                type="button"
                variant={formData?.relationship === option ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('relationship', option)}
                className="justify-center text-sm"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-heading font-medium text-foreground mb-2">
            Ucapan Selamat
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="4"
            placeholder="Tuliskan ucapan selamat dan doa terbaik untuk wisudawan..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            maxLength="500"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <p className="font-caption text-sm text-muted-foreground">
              {formData?.message?.length}/500 karakter
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleInputChange('message', formData?.message + ' 🎓')}
                className="text-xs"
              >
                🎓
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleInputChange('message', formData?.message + ' 🎉')}
                className="text-xs"
              >
                🎉
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleInputChange('message', formData?.message + ' ✨')}
                className="text-xs"
              >
                ✨
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!formData?.name?.trim() || !formData?.message?.trim()}
          iconName="Send"
          iconPosition="left"
        >
          {isLoading ? 'Mengirim Ucapan...' : 'Kirim Ucapan Selamat'}
        </Button>
      </form>
      {/* Sample Messages */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-heading font-semibold text-foreground mb-4 text-center">
          Contoh Ucapan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-muted rounded-lg p-3">
            <p className="font-body text-muted-foreground italic">
              "Selamat atas pencapaian luar biasa ini! Semoga sukses selalu menyertai langkah Anda."
            </p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="font-body text-muted-foreground italic">
              "Bangga melihat perjuangan Anda berbuah manis. Selamat wisuda dan semoga masa depan cerah!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsForm;