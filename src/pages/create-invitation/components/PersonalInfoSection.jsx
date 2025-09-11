import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, handleInputChange, handleSelectChange }) => {
  const universityOptions = [
    { value: 'ui', label: 'Universitas Indonesia' },
    { value: 'ugm', label: 'Universitas Gadjah Mada' },
    { value: 'itb', label: 'Institut Teknologi Bandung' },
    { value: 'its', label: 'Institut Teknologi Sepuluh Nopember' },
    { value: 'unair', label: 'Universitas Airlangga' },
    { value: 'undip', label: 'Universitas Diponegoro' },
    { value: 'unpad', label: 'Universitas Padjadjaran' },
    { value: 'upi', label: 'Universitas Pendidikan Indonesia' }
  ];

  const degreeOptions = [
    { value: 'sarjana', label: 'Sarjana (S1)' },
    { value: 'magister', label: 'Magister (S2)' },
    { value: 'doktor', label: 'Doktor (S3)' },
    { value: 'diploma', label: 'Diploma' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-lg">1</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Informasi Pribadi</h3>
          <p className="text-sm text-muted-foreground">Masukkan data diri Anda</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nama Lengkap"
          type="text"
          placeholder="Masukkan nama lengkap"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          required
          className="col-span-1 md:col-span-2"
        />

        <Input
          label="Nama Panggilan"
          type="text"
          placeholder="Nama yang biasa dipanggil"
          value={formData?.nickname}
          onChange={(e) => handleInputChange('nickname', e?.target?.value)}
        />

        <Input
          label="NIM/NPM"
          type="text"
          placeholder="Nomor Induk Mahasiswa"
          value={formData?.studentId}
          onChange={(e) => handleInputChange('studentId', e?.target?.value)}
          required
        />

        <Select
          label="Universitas"
          placeholder="Pilih universitas"
          options={universityOptions}
          value={formData?.university}
          onChange={(value) => handleSelectChange('university', value)}
          required
          searchable
        />

        <Select
          label="Jenjang Pendidikan"
          placeholder="Pilih jenjang"
          options={degreeOptions}
          value={formData?.degree}
          onChange={(value) => handleSelectChange('degree', value)}
          required
        />

        <Input
          label="Program Studi"
          type="text"
          placeholder="Masukkan program studi"
          value={formData?.major}
          onChange={(e) => handleInputChange('major', e?.target?.value)}
          required
        />

        <Input
          label="Fakultas"
          type="text"
          placeholder="Masukkan fakultas"
          value={formData?.faculty}
          onChange={(e) => handleInputChange('faculty', e?.target?.value)}
          required
        />

        <Input
          label="IPK"
          type="number"
          placeholder="3.50"
          value={formData?.gpa}
          onChange={(e) => handleInputChange('gpa', e?.target?.value)}
          min="0"
          max="4"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;