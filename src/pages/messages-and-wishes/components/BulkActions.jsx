import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActions = ({ 
  selectedMessages, 
  onSelectAll, 
  onDeselectAll, 
  onBulkReply, 
  onBulkMarkSpecial,
  totalMessages 
}) => {
  const [showBulkReplyForm, setShowBulkReplyForm] = useState(false);
  const [bulkReplyText, setBulkReplyText] = useState('');

  const replyTemplates = [
    {
      id: 'thank_you',
      title: 'Terima Kasih Umum',
      content: `Terima kasih banyak atas ucapan selamat dan doa yang telah diberikan untuk wisuda saya. Dukungan dari Anda sangat berarti bagi saya. Semoga kita semua selalu dalam lindungan dan keberkahan Tuhan Yang Maha Esa.`
    },
    {
      id: 'grateful',
      title: 'Penuh Syukur',
      content: `Saya sangat bersyukur dan terharu dengan ucapan selamat yang Anda berikan. Pencapaian ini tidak lepas dari doa dan dukungan orang-orang terbaik seperti Anda. Terima kasih telah menjadi bagian dari perjalanan pendidikan saya.`
    },
    {
      id: 'future_hopes',
      title: 'Harapan Masa Depan',
      content: `Terima kasih atas ucapan selamat dan doa terbaiknya. Semoga ilmu yang telah saya peroleh dapat bermanfaat dan menjadi berkah untuk banyak orang. Mari kita terus saling mendukung dalam meraih cita-cita masing-masing.`
    }
  ];

  const handleBulkReply = () => {
    if (bulkReplyText?.trim()) {
      onBulkReply(selectedMessages, bulkReplyText);
      setBulkReplyText('');
      setShowBulkReplyForm(false);
    }
  };

  const useTemplate = (template) => {
    setBulkReplyText(template?.content);
  };

  if (selectedMessages?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
          <Checkbox
            checked={selectedMessages?.length === totalMessages}
            onChange={(e) => e?.target?.checked ? onSelectAll() : onDeselectAll()}
            label={`${selectedMessages?.length} pesan dipilih`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkReplyForm(!showBulkReplyForm)}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Balas Massal
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkMarkSpecial(selectedMessages)}
            iconName="Star"
            iconPosition="left"
          >
            Tandai Istimewa
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeselectAll}
            iconName="X"
            iconPosition="left"
          >
            Batal Pilih
          </Button>
        </div>
      </div>
      {/* Bulk Reply Form */}
      {showBulkReplyForm && (
        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4">
            Balas {selectedMessages?.length} Pesan Sekaligus
          </h3>

          {/* Template Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {replyTemplates?.map((template) => (
              <Button
                key={template?.id}
                variant="outline"
                size="sm"
                onClick={() => useTemplate(template)}
                className="text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium text-sm">{template?.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {template?.content?.substring(0, 80)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <textarea
              value={bulkReplyText}
              onChange={(e) => setBulkReplyText(e?.target?.value)}
              placeholder="Tulis balasan untuk semua pesan yang dipilih..."
              className="w-full p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
            />
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBulkReplyForm(false)}
              >
                Batal
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkReply}
                disabled={!bulkReplyText?.trim()}
                iconName="Send"
                iconPosition="left"
              >
                Kirim ke {selectedMessages?.length} Pesan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;