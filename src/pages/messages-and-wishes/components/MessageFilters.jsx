import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const MessageFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  searchQuery, 
  totalMessages, 
  filteredCount 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'mostLiked', label: 'Paling Disukai' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Semua Pesan' },
    { value: 'replied', label: 'Sudah Dibalas' },
    { value: 'unreplied', label: 'Belum Dibalas' },
    { value: 'special', label: 'Pesan Istimewa' }
  ];

  const lengthOptions = [
    { value: 'all', label: 'Semua Panjang' },
    { value: 'short', label: 'Pendek (< 100 karakter)' },
    { value: 'medium', label: 'Sedang (100-300 karakter)' },
    { value: 'long', label: 'Panjang (> 300 karakter)' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Cari pesan berdasarkan nama pengirim atau isi pesan..."
          value={searchQuery}
          onChange={(e) => onSearch(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Urutkan berdasarkan"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
        />

        <Select
          label="Status balasan"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange({ ...filters, status: value })}
        />

        <Select
          label="Panjang pesan"
          options={lengthOptions}
          value={filters?.length}
          onChange={(value) => onFilterChange({ ...filters, length: value })}
        />
      </div>
      {/* Results Summary & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-semibold text-foreground">{filteredCount}</span> dari{' '}
            <span className="font-semibold text-foreground">{totalMessages}</span> pesan
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange({ sortBy: 'newest', status: 'all', length: 'all' })}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Filter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Ekspor PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageFilters;