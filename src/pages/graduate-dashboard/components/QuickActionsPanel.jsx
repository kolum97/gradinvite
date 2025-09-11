import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Edit Undangan",
      icon: "Edit3",
      variant: "default",
      onClick: () => navigate('/create-invitation'),
      description: "Ubah detail undangan"
    },
    {
      label: "Lihat Undangan",
      icon: "Eye",
      variant: "outline",
      onClick: () => navigate('/guest-invitation-view'),
      description: "Preview undangan"
    },
    {
      label: "Kelola Tamu",
      icon: "Users",
      variant: "secondary",
      onClick: () => navigate('/messages-and-wishes'),
      description: "Atur daftar tamu"
    },
    {
      label: "Upload Foto",
      icon: "Upload",
      variant: "accent",
      onClick: () => navigate('/photo-gallery'),
      description: "Tambah foto wisuda"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action, index) => (
          <div key={index} className="space-y-2">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="h-12"
            >
              {action?.label}
            </Button>
            <p className="text-xs text-muted-foreground text-center">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;