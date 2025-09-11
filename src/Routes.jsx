import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CreateInvitation from './pages/create-invitation';
import GraduateDashboard from './pages/graduate-dashboard';
import LoginPage from './pages/login';
import PhotoGallery from './pages/photo-gallery';
import GuestInvitationView from './pages/guest-invitation-view';
import MessagesAndWishes from './pages/messages-and-wishes';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreateInvitation />} />
        <Route path="/create-invitation" element={<CreateInvitation />} />
        <Route path="/graduate-dashboard" element={<GraduateDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/guest-invitation-view" element={<GuestInvitationView />} />
        <Route path="/messages-and-wishes" element={<MessagesAndWishes />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
