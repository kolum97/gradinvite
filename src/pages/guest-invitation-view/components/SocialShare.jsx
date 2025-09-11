import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialShare = ({ invitationData }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🎓 Undangan Wisuda ${invitationData?.graduateName}\n\n📅 ${invitationData?.date}\n⏰ ${invitationData?.time} WIB\n📍 ${invitationData?.venue}\n\nMari hadiri momen bersejarah ini bersama-sama!`;
  
  const invitationUrl = window.location?.href;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + invitationUrl)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'bg-blue-500',
      action: () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(invitationUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationUrl)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(invitationUrl)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Email',
      icon: 'Mail',
      color: 'bg-gray-600',
      action: () => {
        const subject = `Undangan Wisuda ${invitationData?.graduateName}`;
        const body = `${shareText}\n\nKlik link berikut untuk melihat undangan lengkap:\n${invitationUrl}`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
      }
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(invitationUrl)}`;
        window.open(url, '_blank');
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard?.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = invitationUrl;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Undangan Wisuda ${invitationData?.graduateName}`,
          text: shareText,
          url: invitationUrl
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="text-center mb-8">
        <Icon name="Share2" size={32} className="mx-auto mb-3 text-primary" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Bagikan Undangan
        </h2>
        <p className="font-body text-muted-foreground">
          Sebarkan kebahagiaan dengan membagikan undangan wisuda ini
        </p>
      </div>
      {/* Native Share (Mobile) */}
      {navigator.share && (
        <div className="mb-6">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleNativeShare}
            iconName="Share"
            iconPosition="left"
            className="md:hidden"
          >
            Bagikan Undangan
          </Button>
        </div>
      )}
      {/* Social Media Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {shareOptions?.map((option) => (
          <Button
            key={option?.name}
            variant="outline"
            size="sm"
            onClick={option?.action}
            className="flex flex-col items-center gap-2 h-20 hover:shadow-ceremonial transition-micro"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${option?.color}`}>
              <Icon name={option?.icon} size={16} color="white" />
            </div>
            <span className="text-xs font-caption">{option?.name}</span>
          </Button>
        ))}
      </div>
      {/* Copy Link */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-caption text-sm text-muted-foreground mb-1">Link Undangan</p>
            <p className="font-mono text-sm text-foreground truncate">{invitationUrl}</p>
          </div>
          <Button
            variant={copied ? 'success' : 'outline'}
            size="sm"
            onClick={copyToClipboard}
            iconName={copied ? 'Check' : 'Copy'}
            iconPosition="left"
          >
            {copied ? 'Tersalin!' : 'Salin'}
          </Button>
        </div>
      </div>
      {/* Share Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-heading text-2xl font-bold text-primary">24</div>
            <div className="font-caption text-sm text-muted-foreground">Dibagikan</div>
          </div>
          <div>
            <div className="font-heading text-2xl font-bold text-secondary">156</div>
            <div className="font-caption text-sm text-muted-foreground">Dilihat</div>
          </div>
          <div>
            <div className="font-heading text-2xl font-bold text-success">18</div>
            <div className="font-caption text-sm text-muted-foreground">RSVP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;