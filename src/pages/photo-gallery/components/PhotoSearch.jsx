import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PhotoSearch = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const dateFilterOptions = [
    { value: 'all', label: 'Semua Tanggal' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: '7 Hari Terakhir' },
    { value: 'month', label: '30 Hari Terakhir' },
    { value: 'year', label: 'Tahun Ini' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'name', label: 'Nama A-Z' },
    { value: 'views', label: 'Paling Dilihat' },
    { value: 'likes', label: 'Paling Disukai' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    onFilter('date', value);
  };

  const handleSort = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('all');
    setSortBy('newest');
    onSearch('');
    onFilter('date', 'all');
    onSort('newest');
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        {/* Search input */}
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Cari foto berdasarkan keterangan..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Date filter */}
        <div className="w-full md:w-48">
          <Select
            options={dateFilterOptions}
            value={dateFilter}
            onChange={handleDateFilter}
            placeholder="Filter Tanggal"
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-48">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSort}
            placeholder="Urutkan"
          />
        </div>

        {/* Clear filters */}
        <Button
          variant="outline"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={clearFilters}
          className="w-full md:w-auto"
        >
          Reset
        </Button>
      </div>
      {/* Active filters indicator */}
      {(searchTerm || dateFilter !== 'all' || sortBy !== 'newest') && (
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Filter aktif:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                Pencarian: "{searchTerm}"
              </span>
            )}
            {dateFilter !== 'all' && (
              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
                {dateFilterOptions?.find(opt => opt?.value === dateFilter)?.label}
              </span>
            )}
            {sortBy !== 'newest' && (
              <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                {sortOptions?.find(opt => opt?.value === sortBy)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoSearch;