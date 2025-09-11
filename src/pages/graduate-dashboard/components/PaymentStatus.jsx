import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentStatus = () => {
  const paymentInfo = {
    plan: "Premium",
    status: "active",
    expiryDate: "15 November 2024",
    features: [
      "Undangan tanpa batas",
      "Template premium",
      "Galeri foto unlimited",
      "Analytics detail",
      "Support prioritas"
    ],
    nextBilling: "Rp 99.000",
    billingDate: "15 November 2024"
  };

  const isPremium = paymentInfo?.status === "active";

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isPremium ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
          }`}>
            <Icon name={isPremium ? "Crown" : "AlertCircle"} size={20} />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Paket {paymentInfo?.plan}
            </h2>
            <p className={`text-sm ${isPremium ? 'text-success' : 'text-warning'}`}>
              {isPremium ? 'Aktif' : 'Berakhir Segera'}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isPremium 
            ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
        }`}>
          {isPremium ? 'Premium' : 'Gratis'}
        </div>
      </div>
      {isPremium && (
        <div className="mb-4 p-4 bg-gradient-to-r from-success/10 to-accent/10 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Berlaku hingga</span>
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">{paymentInfo?.expiryDate}</p>
        </div>
      )}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-foreground">Fitur yang Tersedia:</h3>
        {paymentInfo?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
      {isPremium ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Pembayaran Berikutnya</span>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{paymentInfo?.nextBilling}</p>
              <p className="text-xs text-muted-foreground">{paymentInfo?.billingDate}</p>
            </div>
          </div>
          <Button variant="outline" fullWidth iconName="CreditCard" iconPosition="left">
            Kelola Pembayaran
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Button variant="default" fullWidth iconName="Zap" iconPosition="left">
            Upgrade ke Premium
          </Button>
          <Button variant="ghost" fullWidth iconName="Info" iconPosition="left">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;