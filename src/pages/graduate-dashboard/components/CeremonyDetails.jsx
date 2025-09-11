import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CeremonyDetails = () => {
  const navigate = useNavigate();

  const ceremonyInfo = {
    university: "Universitas Indonesia",
    faculty: "Fakultas Teknik",
    major: "Teknik Informatika",
    degree: "Sarjana Komputer (S.Kom)",
    date: "15 Oktober 2024",
    time: "10:00 WIB",
    venue: "Balai Sidang UI, Depok",
    dressCode: "Toga dan Pakaian Formal",
    gpa: "3.75",
    honors: "Cum Laude"
  };

  const detailItems = [
    { icon: "Calendar", label: "Tanggal", value: ceremonyInfo?.date },
    { icon: "Clock", label: "Waktu", value: ceremonyInfo?.time },
    { icon: "MapPin", label: "Tempat", value: ceremonyInfo?.venue },
    { icon: "Shirt", label: "Dress Code", value: ceremonyInfo?.dressCode },
    { icon: "Award", label: "IPK", value: ceremonyInfo?.gpa },
    { icon: "Star", label: "Predikat", value: ceremonyInfo?.honors }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">Detail Wisuda</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName="Edit3"
          onClick={() => navigate('/create-invitation')}
        >
          Edit
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <h3 className="font-heading font-semibold text-foreground mb-1">{ceremonyInfo?.university}</h3>
          <p className="text-sm text-muted-foreground">{ceremonyInfo?.faculty}</p>
          <p className="text-sm font-medium text-primary">{ceremonyInfo?.major}</p>
          <p className="text-xs text-muted-foreground mt-2">{ceremonyInfo?.degree}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {detailItems?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={item?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{item?.label}</p>
                <p className="text-sm font-medium text-foreground truncate">{item?.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Button 
          variant="default" 
          fullWidth 
          iconName="Eye" 
          iconPosition="left"
          onClick={() => navigate('/guest-invitation-view')}
        >
          Preview Undangan
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          iconName="Share2" 
          iconPosition="left"
        >
          Bagikan Undangan
        </Button>
      </div>
    </div>
  );
};

export default CeremonyDetails;