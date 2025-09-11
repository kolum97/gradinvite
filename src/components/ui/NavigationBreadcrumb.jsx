import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/graduate-dashboard': [
      { label: 'Dashboard', path: '/graduate-dashboard', isActive: true }
    ],
    '/create-invitation': [
      { label: 'Dashboard', path: '/graduate-dashboard', isActive: false },
      { label: 'Buat Undangan', path: '/create-invitation', isActive: true }
    ],
    '/photo-gallery': [
      { label: 'Dashboard', path: '/graduate-dashboard', isActive: false },
      { label: 'Galeri Foto', path: '/photo-gallery', isActive: true }
    ],
    '/messages-and-wishes': [
      { label: 'Dashboard', path: '/graduate-dashboard', isActive: false },
      { label: 'Pesan & Ucapan', path: '/messages-and-wishes', isActive: true }
    ]
  };

  const currentBreadcrumbs = breadcrumbMap?.[location?.pathname];

  // Don't show breadcrumbs for guest view, login, or unmapped routes
  if (!currentBreadcrumbs || location?.pathname === '/guest-invitation-view' || location?.pathname === '/login') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-muted-foreground" />
      {currentBreadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {crumb?.isActive ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="text-muted-foreground hover:text-foreground transition-micro hover:underline"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavigationBreadcrumb;