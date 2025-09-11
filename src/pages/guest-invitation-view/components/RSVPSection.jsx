import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RSVPSection = () => {
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRSVPSubmit = async (e) => {
    e?.preventDefault();
    
    if (!rsvpStatus || !guestName?.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleRSVPChoice = (status) => {
    setRsvpStatus(status);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={24} color="white" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
            Terima Kasih!
          </h2>
          <p className="font-body text-muted-foreground mb-4">
            RSVP Anda telah berhasil dikirim. Kami sangat menghargai konfirmasi kehadiran Anda.
          </p>
          <div className="bg-muted rounded-lg p-4 inline-block">
            <p className="font-body text-sm">
              <span className="font-semibold">Status:</span> {rsvpStatus === 'attending' ? 'Hadir' : 'Tidak Hadir'}
            </p>
            {guestName && (
              <p className="font-body text-sm">
                <span className="font-semibold">Nama:</span> {guestName}
              </p>
            )}
          </div>
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSubmitted(false);
                setRsvpStatus('');
                setGuestName('');
                setGuestMessage('');
              }}
              iconName="Edit"
              iconPosition="left"
            >
              Ubah RSVP
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-8">
        <Icon name="UserCheck" size={32} className="mx-auto mb-3 text-primary" />
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Konfirmasi Kehadiran
        </h2>
        <p className="font-body text-muted-foreground">
          Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara dengan baik
        </p>
      </div>
      <form onSubmit={handleRSVPSubmit} className="max-w-md mx-auto">
        {/* RSVP Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            type="button"
            variant={rsvpStatus === 'attending' ? 'default' : 'outline'}
            size="lg"
            onClick={() => handleRSVPChoice('attending')}
            iconName="Check"
            iconPosition="left"
            className="h-16"
          >
            Hadir
          </Button>
          <Button
            type="button"
            variant={rsvpStatus === 'not_attending' ? 'destructive' : 'outline'}
            size="lg"
            onClick={() => handleRSVPChoice('not_attending')}
            iconName="X"
            iconPosition="left"
            className="h-16"
          >
            Tidak Hadir
          </Button>
        </div>

        {rsvpStatus && (
          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={guestName}
              onChange={(e) => setGuestName(e?.target?.value)}
              required
            />

            <Input
              label="Pesan (Opsional)"
              type="text"
              placeholder="Tinggalkan pesan untuk wisudawan"
              value={guestMessage}
              onChange={(e) => setGuestMessage(e?.target?.value)}
              description={`${guestMessage?.length}/200 karakter`}
            />

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!guestName?.trim()}
              iconName="Send"
              iconPosition="left"
            >
              {isLoading ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </Button>
          </div>
        )}
      </form>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="font-caption text-sm text-muted-foreground">
          Batas konfirmasi: 3 hari sebelum acara wisuda
        </p>
      </div>
    </div>
  );
};

export default RSVPSection;