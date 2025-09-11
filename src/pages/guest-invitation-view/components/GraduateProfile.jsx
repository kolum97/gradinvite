import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const GraduateProfile = ({ graduate }) => {
  return (
    <div className="bg-card rounded-xl shadow-ceremonial-lg p-8 mb-8 border border-border">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Graduate Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary shadow-ceremonial-lg">
              <Image
                src={graduate?.photo}
                alt={`Foto ${graduate?.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-secondary rounded-full flex items-center justify-center border-4 border-background shadow-ceremonial">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Graduate Information */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {graduate?.name}
            </h1>
            <p className="font-body text-lg text-muted-foreground mb-4">
              {graduate?.degree} - {graduate?.major}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} />
                <span>Angkatan {graduate?.batch}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} />
                <span>IPK {graduate?.gpa}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                <span>{graduate?.university}</span>
              </div>
            </div>
          </div>

          {/* Personal Message */}
          <div className="bg-muted rounded-lg p-6 border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <Icon name="Quote" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-body text-foreground leading-relaxed italic">
                  "{graduate?.personalMessage}"
                </p>
                <p className="font-caption text-sm text-muted-foreground mt-3">
                  - {graduate?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateProfile;