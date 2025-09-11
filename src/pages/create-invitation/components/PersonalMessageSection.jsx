import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalMessageSection = ({ formData, handleInputChange }) => {
  const messageTemplates = [
    {
      id: 'gratitude',
      title: 'Ucapan Syukur',
      content: `Dengan penuh rasa syukur kepada Tuhan Yang Maha Esa, saya mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara wisuda saya.\n\nKehadiran dan doa restu dari Anda sangat berarti bagi saya dalam merayakan pencapaian ini.`
    },
    {
      id: 'journey',
      title: 'Perjalanan Studi',
      content: `Setelah menempuh perjalanan panjang dalam dunia pendidikan, akhirnya saya akan meraih gelar sarjana.\n\nTanpa dukungan dan doa dari keluarga serta sahabat, pencapaian ini tidak akan mungkin terwujud. Terima kasih atas segala dukungannya.`
    },
    {
      id: 'achievement',
      title: 'Pencapaian',
      content: `Hari yang ditunggu-tunggu akhirnya tiba! Saya dengan bangga mengundang Anda untuk menyaksikan momen bersejarah dalam hidup saya.\n\nMari kita rayakan bersama pencapaian yang telah diperjuangkan dengan kerja keras dan dedikasi.`
    }
  ];

  const handleTemplateSelect = (template) => {
    handleInputChange('personalMessage', template?.content);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-ceremonial">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <span className="text-accent-foreground font-semibold text-lg">3</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Pesan Pribadi</h3>
          <p className="text-sm text-muted-foreground">Sampaikan pesan khusus untuk tamu undangan</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Template Pesan
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {messageTemplates?.map((template) => (
              <button
                key={template?.id}
                onClick={() => handleTemplateSelect(template)}
                className="p-4 text-left border border-border rounded-lg hover:border-primary hover:bg-muted transition-micro group"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MessageSquare" size={16} className="text-primary" />
                  <span className="font-medium text-sm text-foreground group-hover:text-primary">
                    {template?.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {template?.content?.substring(0, 80)}...
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="personalMessage" className="block text-sm font-medium text-foreground mb-2">
            Pesan Anda
          </label>
          <textarea
            id="personalMessage"
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
            placeholder="Tulis pesan pribadi Anda untuk tamu undangan..."
            value={formData?.personalMessage}
            onChange={(e) => handleInputChange('personalMessage', e?.target?.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              Pesan yang hangat dan personal akan membuat undangan lebih berkesan
            </p>
            <span className="text-xs text-muted-foreground">
              {formData?.personalMessage?.length}/500
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-foreground mb-1">Tips Menulis Pesan</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Sampaikan rasa syukur dan kebahagiaan Anda</li>
                <li>• Ceritakan sedikit tentang perjalanan studi Anda</li>
                <li>• Ungkapkan harapan untuk masa depan</li>
                <li>• Jangan lupa berterima kasih atas dukungan mereka</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalMessageSection;