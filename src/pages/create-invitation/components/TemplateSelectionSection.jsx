import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TemplateSelectionSection = ({ formData, handleSelectChange }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Klasik Elegan',
      description: 'Desain tradisional dengan sentuhan modern',
      preview: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=400&fit=crop',
      colors: ['#1E3A8A', '#D97706', '#FFFFFF'],
      features: ['Border emas', 'Font serif', 'Layout vertikal']
    },
    {
      id: 'modern',
      name: 'Modern Minimalis',
      description: 'Desain clean dan contemporary',
      preview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop',
      colors: ['#7C3AED', '#059669', '#F8FAFC'],
      features: ['Desain flat', 'Font sans-serif', 'Layout horizontal']
    },
    {
      id: 'university',
      name: 'Tema Universitas',
      description: 'Menggunakan warna dan logo universitas',
      preview: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=400&fit=crop',
      colors: ['#DC2626', '#1F2937', '#FBBF24'],
      features: ['Logo universitas', 'Warna institusi', 'Formal akademik']
    },
    {
      id: 'floral',
      name: 'Floral Garden',
      description: 'Dekorasi bunga yang elegan dan feminin',
      preview: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=400&fit=crop',
      colors: ['#EC4899', '#10B981', '#FEF3C7'],
      features: ['Motif bunga', 'Warna soft', 'Desain romantis']
    },
    {
      id: 'geometric',
      name: 'Geometric Art',
      description: 'Pola geometris yang modern dan stylish',
      preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=400&fit=crop',
      colors: ['#0EA5E9', '#F59E0B', '#1F2937'],
      features: ['Pola geometris', 'Warna kontras', 'Desain bold']
    },
    {
      id: 'vintage',
      name: 'Vintage Classic',
      description: 'Nuansa retro dengan sentuhan nostalgia',
      preview: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      colors: ['#92400E', '#065F46', '#FEF7CD'],
      features: ['Efek vintage', 'Ornamen klasik', 'Warna earth tone']
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
          <span className="text-success-foreground font-semibold text-lg">4</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Pilih Template</h3>
          <p className="text-sm text-muted-foreground">Pilih desain yang sesuai dengan kepribadian Anda</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-ceremonial-lg ${
              formData?.template === template?.id
                ? 'border-primary shadow-ceremonial-lg'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleSelectChange('template', template?.id)}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
              <Image
                src={template?.preview}
                alt={template?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm text-foreground">{template?.name}</h4>
                {formData?.template === template?.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">{template?.description}</p>
              
              <div className="flex items-center space-x-2 mb-3">
                {template?.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <div className="space-y-1">
                {template?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {formData?.template === template?.id && (
              <div className="absolute inset-0 bg-primary/10 rounded-lg pointer-events-none" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Palette" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Kustomisasi Lanjutan</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Setelah memilih template, Anda dapat menyesuaikan warna, font, dan layout sesuai keinginan.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-background rounded text-xs text-muted-foreground border border-border">
                Ubah Warna
              </span>
              <span className="px-2 py-1 bg-background rounded text-xs text-muted-foreground border border-border">
                Pilih Font
              </span>
              <span className="px-2 py-1 bg-background rounded text-xs text-muted-foreground border border-border">
                Atur Layout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionSection;