import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const PhotoUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('graduation');
  const fileInputRef = useRef(null);

  const categoryOptions = [
    { value: 'graduation', label: 'Foto Wisuda' },
    { value: 'campus', label: 'Foto Kampus' },
    { value: 'family', label: 'Foto Keluarga' },
    { value: 'others', label: 'Lainnya' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files)?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 10 * 1024 * 1024
    );
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files) {
      handleFiles(e?.target?.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles?.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onUpload(selectedFiles, selectedCategory);
            setSelectedFiles([]);
            setUploadProgress(0);
            setIsUploading(false);
            onClose();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-ceremonial-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">Upload Foto</h2>
            <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
          </div>

          <div className="space-y-6">
            <Select
              label="Kategori Foto"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              required
            />

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Seret foto ke sini atau klik untuk memilih
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mendukung JPG, PNG, GIF hingga 10MB per file
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Pilih File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFiles?.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">File Terpilih ({selectedFiles?.length})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles?.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Image" size={20} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{file?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        iconName="X"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Mengupload...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose} disabled={isUploading}>
                Batal
              </Button>
              <Button
                variant="default"
                onClick={handleUpload}
                disabled={selectedFiles?.length === 0 || isUploading}
                loading={isUploading}
                iconName="Upload"
                iconPosition="left"
              >
                Upload {selectedFiles?.length > 0 && `(${selectedFiles?.length})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal;