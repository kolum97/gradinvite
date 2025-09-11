import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageCard = ({ message, onReply, onReact, onShare }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(message?.isLiked || false);

  const handleReply = () => {
    if (replyText?.trim()) {
      onReply(message?.id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onReact(message?.id, !isLiked ? 'like' : 'unlike');
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-ceremonial hover:shadow-ceremonial-lg transition-all duration-200">
      {/* Message Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={message?.avatar}
            alt={`Avatar ${message?.senderName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{message?.senderName}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(message?.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {message?.isSpecial && (
            <div className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="Star" size={12} className="inline mr-1" />
              Istimewa
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => onShare(message)}>
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>
      {/* Message Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message?.content}</p>
      </div>
      {/* Message Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`${isLiked ? 'text-error' : 'text-muted-foreground'} hover:text-error`}
          >
            <Icon name={isLiked ? "Heart" : "Heart"} size={16} className={isLiked ? "fill-current" : ""} />
            <span className="ml-1">{message?.likes + (isLiked && !message?.isLiked ? 1 : 0)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="ml-1">Balas</span>
          </Button>
        </div>
        
        {message?.hasReply && (
          <div className="flex items-center text-sm text-success">
            <Icon name="CheckCircle" size={16} className="mr-1" />
            Sudah Dibalas
          </div>
        )}
      </div>
      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e?.target?.value)}
              placeholder="Tulis balasan Anda..."
              className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(false)}
              >
                Batal
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleReply}
                disabled={!replyText?.trim()}
              >
                Kirim Balasan
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Existing Reply */}
      {message?.reply && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CornerDownRight" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Balasan Anda:</span>
            </div>
            <p className="text-sm text-muted-foreground">{message?.reply}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCard;