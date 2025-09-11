import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Button from '../../../components/ui/Button';

const CeremonyDetailsSection = ({ formData, handleInputChange, handleSelectChange }) => {
  const [showMap, setShowMap] = useState(false);

  const ceremonyTypeOptions = [
    { value: 'offline', label: 'Offline (Tatap Muka)' },
    { value: 'online', label: 'Online (Virtual)' },
    { value: 'hybrid', label: 'Hybrid (Offline + Online)' }
  ];

  const dressCodeOptions = [
    { value: 'formal', label: 'Formal (Jas/Kebaya)' },
    { value: 'semi-formal', label: 'Semi Formal' },
    { value: 'batik', label: 'Batik' },
    { value: 'traditional', label: 'Pakaian Adat' },
    { value: 'free', label: 'Bebas Sopan' }
  ];

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-secondary-foreground font-semibold text-lg">2</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Detail Acara</h3>
          <p className="text-sm text-muted-foreground">Informasi lengkap upacara wisuda</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Tanggal Wisuda"
          type="date"
          value={formData?.ceremonyDate}
          onChange={(e) => handleInputChange('ceremonyDate', e?.target?.value)}
          required
        />

        <Input
          label="Waktu Mulai"
          type="time"
          value={formData?.ceremonyTime}
          onChange={(e) => handleInputChange('ceremonyTime', e?.target?.value)}
          required
        />

        <Select
          label="Jenis Acara"
          placeholder="Pilih jenis acara"
          options={ceremonyTypeOptions}
          value={formData?.ceremonyType}
          onChange={(value) => handleSelectChange('ceremonyType', value)}
          required
        />

        <Select
          label="Dress Code"
          placeholder="Pilih dress code"
          options={dressCodeOptions}
          value={formData?.dressCode}
          onChange={(value) => handleSelectChange('dressCode', value)}
          required
        />

        <div className="col-span-1 md:col-span-2">
          <Input
            label="Lokasi Acara"
            type="text"
            placeholder="Nama gedung, alamat lengkap"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            required
          />
          
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMap}
              iconName={showMap ? "ChevronUp" : "MapPin"}
              iconPosition="left"
            >
              {showMap ? "Sembunyikan Peta" : "Lihat di Peta"}
            </Button>
          </div>

          {showMap && (
            <div className="mt-4 h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Lokasi Wisuda"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=-6.3714,106.8286&z=15&output=embed"
                className="border-0"
              />
            </div>
          )}
        </div>

        {formData?.ceremonyType === 'online' || formData?.ceremonyType === 'hybrid' ? (
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Link Streaming"
              type="url"
              placeholder="https://zoom.us/j/123456789"
              value={formData?.streamingLink}
              onChange={(e) => handleInputChange('streamingLink', e?.target?.value)}
              description="Link untuk mengikuti acara secara online"
            />
          </div>
        ) : null}

        <div className="col-span-1 md:col-span-2">
          <Input
            label="Catatan Tambahan"
            type="text"
            placeholder="Informasi penting lainnya untuk tamu"
            value={formData?.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
            description="Opsional: Parkir, transportasi, dll"
          />
        </div>
      </div>
    </div>
  );
};

export default CeremonyDetailsSection;