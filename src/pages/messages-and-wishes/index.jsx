import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import MessageCard from './components/MessageCard';
import MessageFilters from './components/MessageFilters';
import MessageStats from './components/MessageStats';
import BulkActions from './components/BulkActions';
import FeaturedMessages from './components/FeaturedMessages';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MessagesAndWishes = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    status: 'all',
    length: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);

  // Mock data for messages
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        senderName: "Dr. Sari Wijayanti",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        content: `Selamat atas pencapaian luar biasa ini! Sebagai dosen pembimbing, saya sangat bangga melihat dedikasi dan kerja keras Anda selama ini. Semoga ilmu yang telah diperoleh dapat bermanfaat untuk kemajuan bangsa dan negara. Sukses selalu untuk masa depan yang gemilang!`,
        createdAt: new Date('2024-09-08T10:30:00'),
        likes: 15,
        isLiked: true,
        hasReply: true,
        reply: "Terima kasih banyak Bu Sari atas bimbingan dan dukungannya selama ini. Tanpa arahan Ibu, saya tidak akan bisa sampai di titik ini.",
        isSpecial: true
      },
      {
        id: 2,
        senderName: "Ahmad Rizki Pratama",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        content: `Bro, akhirnya lulus juga! Ingat masa-masa kita begadang bareng ngerjain tugas, sekarang semua terbayar sudah. Selamat ya, semoga cepet dapet kerja yang bagus dan jangan lupa traktir hahaha. Sukses terus!`,
        createdAt: new Date('2024-09-08T14:15:00'),
        likes: 8,
        isLiked: false,
        hasReply: false,
        isSpecial: false
      },
      {
        id: 3,
        senderName: "Ibu Siti Nurhaliza",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        content: `Anak mama yang hebat, mama sangat bangga dengan pencapaian ini. Semua pengorbanan dan perjuangan selama kuliah akhirnya membuahkan hasil. Semoga Allah SWT selalu memberkahi langkah-langkahmu ke depan. Mama sayang kamu!`,
        createdAt: new Date('2024-09-07T20:45:00'),
        likes: 25,
        isLiked: true,
        hasReply: true,
        reply: "Terima kasih Ma, semua ini berkat doa dan dukungan Mama. Anak akan terus berusaha membuat Mama bangga.",
        isSpecial: true
      },
      {
        id: 4,
        senderName: "Prof. Dr. Bambang Sutrisno",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        content: `Congratulations on your graduation! Your research work has been exceptional and I'm confident you'll make significant contributions to your field. Wishing you all the best for your future endeavors.`,
        createdAt: new Date('2024-09-07T16:20:00'),
        likes: 12,
        isLiked: false,
        hasReply: false,
        isSpecial: false
      },
      {
        id: 5,
        senderName: "Dewi Kartika Sari",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        content: `Selamat wisuda sayang! Kita udah dari SMA bareng, kuliah juga bareng, sekarang wisuda juga bareng. Seneng banget bisa jadi saksi perjalanan kamu sampai sejauh ini. Semoga kita bisa tetap saling support di masa depan ya!`,
        createdAt: new Date('2024-09-06T11:30:00'),
        likes: 18,
        isLiked: true,
        hasReply: true,
        reply: "Makasih banget Dewi! Tanpa support kamu dari dulu, aku ga akan bisa sampai sini. Love you bestie!",
        isSpecial: true
      },
      {
        id: 6,
        senderName: "Bapak Hendra Gunawan",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
        content: `Selamat atas kelulusannya nak. Bapak sebagai tetangga merasa bangga melihat perkembangan kamu dari kecil sampai sekarang jadi sarjana. Semoga sukses dan bisa jadi kebanggaan keluarga serta masyarakat.`,
        createdAt: new Date('2024-09-05T19:10:00'),
        likes: 6,
        isLiked: false,
        hasReply: false,
        isSpecial: false
      },
      {
        id: 7,
        senderName: "Tim Himpunan Mahasiswa",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
        content: `Selamat wisuda untuk salah satu anggota terbaik kami! Kontribusi kamu selama di organisasi sangat berharga. Semoga pengalaman berorganisasi bisa membantu karir kamu ke depan. Sukses selalu!`,
        createdAt: new Date('2024-09-05T13:45:00'),
        likes: 22,
        isLiked: true,
        hasReply: false,
        isSpecial: false
      },
      {
        id: 8,
        senderName: "Nenek Aminah",
        avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150",
        content: `Cucu nenek yang pinter, alhamdulillah akhirnya lulus juga. Nenek bangga banget sama kamu. Semoga jadi anak yang berbakti dan sukses dunia akhirat. Jangan lupa main ke rumah nenek ya!`,
        createdAt: new Date('2024-09-04T15:20:00'),
        likes: 30,
        isLiked: true,
        hasReply: true,
        reply: "Amin nenek, terima kasih doanya. Insya Allah cucu akan selalu berbakti sama nenek. Love you nek!",
        isSpecial: true
      }
    ];

    setMessages(mockMessages);
  }, []);

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    let filtered = [...messages];

    // Search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(message =>
        message?.senderName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        message?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Status filter
    if (filters?.status !== 'all') {
      switch (filters?.status) {
        case 'replied':
          filtered = filtered?.filter(message => message?.hasReply);
          break;
        case 'unreplied':
          filtered = filtered?.filter(message => !message?.hasReply);
          break;
        case 'special':
          filtered = filtered?.filter(message => message?.isSpecial);
          break;
      }
    }

    // Length filter
    if (filters?.length !== 'all') {
      switch (filters?.length) {
        case 'short':
          filtered = filtered?.filter(message => message?.content?.length < 100);
          break;
        case 'medium':
          filtered = filtered?.filter(message => message?.content?.length >= 100 && message?.content?.length <= 300);
          break;
        case 'long':
          filtered = filtered?.filter(message => message?.content?.length > 300);
          break;
      }
    }

    // Sort filter
    switch (filters?.sortBy) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'mostLiked':
        filtered?.sort((a, b) => b?.likes - a?.likes);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.senderName?.localeCompare(b?.senderName));
        break;
    }

    return filtered;
  }, [messages, filters, searchQuery]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMessages = messages?.length;
    const repliedMessages = messages?.filter(m => m?.hasReply)?.length;
    const unrepliedMessages = totalMessages - repliedMessages;
    const responseRate = totalMessages > 0 ? Math.round((repliedMessages / totalMessages) * 100) : 0;

    return {
      totalMessages,
      repliedMessages,
      unrepliedMessages,
      responseRate
    };
  }, [messages]);

  // Get featured messages
  const featuredMessages = useMemo(() => {
    return messages?.filter(message => message?.isSpecial);
  }, [messages]);

  // Handle message actions
  const handleReply = (messageId, replyText) => {
    setMessages(prev => prev?.map(message =>
      message?.id === messageId
        ? { ...message, hasReply: true, reply: replyText }
        : message
    ));
  };

  const handleReact = (messageId, action) => {
    setMessages(prev => prev?.map(message =>
      message?.id === messageId
        ? {
            ...message,
            isLiked: action === 'like',
            likes: action === 'like' ? message?.likes + 1 : Math.max(0, message?.likes - 1)
          }
        : message
    ));
  };

  const handleShare = (message) => {
    if (navigator.share) {
      navigator.share({
        title: `Pesan dari ${message?.senderName}`,
        text: message?.content,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(`"${message?.content}" - ${message?.senderName}`);
      alert('Pesan telah disalin ke clipboard!');
    }
  };

  // Handle bulk actions
  const handleSelectAll = () => {
    setSelectedMessages(filteredMessages?.map(m => m?.id));
  };

  const handleDeselectAll = () => {
    setSelectedMessages([]);
  };

  const handleBulkReply = (messageIds, replyText) => {
    setMessages(prev => prev?.map(message =>
      messageIds?.includes(message?.id)
        ? { ...message, hasReply: true, reply: replyText }
        : message
    ));
    setSelectedMessages([]);
  };

  const handleBulkMarkSpecial = (messageIds) => {
    setMessages(prev => prev?.map(message =>
      messageIds?.includes(message?.id)
        ? { ...message, isSpecial: true }
        : message
    ));
    setSelectedMessages([]);
  };

  // Handle featured message actions
  const handleRemoveFromFeatured = (messageId) => {
    setMessages(prev => prev?.map(message =>
      message?.id === messageId
        ? { ...message, isSpecial: false }
        : message
    ));
  };

  const handleAddToInvitation = (messageId) => {
    alert('Pesan telah ditambahkan ke undangan!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pesan & Ucapan - GradInvite</title>
        <meta name="description" content="Kelola pesan dan ucapan selamat dari tamu undangan wisuda Anda" />
      </Helmet>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationBreadcrumb />

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Pesan & Ucapan</h1>
            <p className="text-muted-foreground">
              Kelola dan balas ucapan selamat dari tamu undangan wisuda Anda
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={showFeatured ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFeatured(!showFeatured)}
              iconName="Star"
              iconPosition="left"
            >
              {showFeatured ? 'Semua Pesan' : 'Pesan Istimewa'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <MessageStats stats={stats} />

        {showFeatured ? (
          /* Featured Messages View */
          (<FeaturedMessages
            featuredMessages={featuredMessages}
            onRemoveFromFeatured={handleRemoveFromFeatured}
            onAddToInvitation={handleAddToInvitation}
          />)
        ) : (
          /* Main Messages View */
          (<>
            {/* Filters */}
            <MessageFilters
              filters={filters}
              onFilterChange={setFilters}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              totalMessages={messages?.length}
              filteredCount={filteredMessages?.length}
            />
            {/* Bulk Actions */}
            <BulkActions
              selectedMessages={selectedMessages}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onBulkReply={handleBulkReply}
              onBulkMarkSpecial={handleBulkMarkSpecial}
              totalMessages={filteredMessages?.length}
            />
            {/* Messages List */}
            <div className="space-y-6">
              {filteredMessages?.length > 0 ? (
                filteredMessages?.map((message) => (
                  <div key={message?.id} className="relative">
                    <div className="absolute left-4 top-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedMessages?.includes(message?.id)}
                        onChange={(e) => {
                          if (e?.target?.checked) {
                            setSelectedMessages(prev => [...prev, message?.id]);
                          } else {
                            setSelectedMessages(prev => prev?.filter(id => id !== message?.id));
                          }
                        }}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                    </div>
                    <div className="pl-10">
                      <MessageCard
                        message={message}
                        onReply={handleReply}
                        onReact={handleReact}
                        onShare={handleShare}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-card border border-border rounded-lg p-12 text-center shadow-ceremonial">
                  <Icon name="MessageCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery || filters?.status !== 'all' || filters?.length !== 'all' ?'Tidak Ada Pesan yang Sesuai' :'Belum Ada Pesan Masuk'
                    }
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filters?.status !== 'all' || filters?.length !== 'all' ?'Coba ubah filter atau kata kunci pencarian Anda' :'Pesan dan ucapan selamat dari tamu akan muncul di sini'
                    }
                  </p>
                  {(searchQuery || filters?.status !== 'all' || filters?.length !== 'all') && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({ sortBy: 'newest', status: 'all', length: 'all' });
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Reset Filter
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>)
        )}
      </main>
    </div>
  );
};

export default MessagesAndWishes;