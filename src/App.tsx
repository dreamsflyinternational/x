import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ViewType } from './types';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactWidgets } from './components/FloatingContactWidgets';
import { SeoHeadManager } from './components/SeoHeadManager';
import { LanguageProvider } from './lib/i18n';

import { HomeView } from './views/HomeView';
import { ServiceDetailItem } from './components/ServiceDetailPageModal';
import { ALL_SERVICES_DATA } from './data/servicesData';
import { COUNTRIES } from './data/countries';
import { parsePath, formatPath, navigateToPath } from './lib/router';
import { getSavedLanguagePreference } from './lib/autoLanguageManager';

// Lazy-loaded views and modals for ultra-fast initial bundle loading
const AboutView = lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const ServicesView = lazy(() => import('./views/ServicesView').then(m => ({ default: m.ServicesView })));
const CountriesView = lazy(() => import('./views/CountriesView').then(m => ({ default: m.CountriesView })));
const CountryDetailPage = lazy(() => import('./components/CountryDetailPage').then(m => ({ default: m.CountryDetailPage })));
const WorkPermitsView = lazy(() => import('./views/WorkPermitsView').then(m => ({ default: m.WorkPermitsView })));
const UmrahView = lazy(() => import('./views/UmrahView').then(m => ({ default: m.UmrahView })));
const ToursView = lazy(() => import('./views/ToursView').then(m => ({ default: m.ToursView })));
const AirTicketingView = lazy(() => import('./views/AirTicketingView').then(m => ({ default: m.AirTicketingView })));
const HotelBookingView = lazy(() => import('./views/HotelBookingView').then(m => ({ default: m.HotelBookingView })));
const BlogView = lazy(() => import('./views/BlogView').then(m => ({ default: m.BlogView })));
const ContactView = lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const SitemapView = lazy(() => import('./views/SitemapView').then(m => ({ default: m.SitemapView })));

const VisaEligibilityChecker = lazy(() => import('./components/VisaEligibilityChecker').then(m => ({ default: m.VisaEligibilityChecker })));
const VisaCostCalculator = lazy(() => import('./components/VisaCostCalculator').then(m => ({ default: m.VisaCostCalculator })));
const ApplicationTracker = lazy(() => import('./components/ApplicationTracker').then(m => ({ default: m.ApplicationTracker })));
const CustomerDashboard = lazy(() => import('./components/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));

const AiTravelPlannerModal = lazy(() => import('./components/AiTravelPlannerModal').then(m => ({ default: m.AiTravelPlannerModal })));
const BookingInquiryModal = lazy(() => import('./components/BookingInquiryModal').then(m => ({ default: m.BookingInquiryModal })));
const DocumentUploadPortalModal = lazy(() => import('./components/DocumentUploadPortalModal').then(m => ({ default: m.DocumentUploadPortalModal })));
const TravelChecklistModal = lazy(() => import('./components/TravelChecklistModal').then(m => ({ default: m.TravelChecklistModal })));
const VisaComparisonModal = lazy(() => import('./components/VisaComparisonModal').then(m => ({ default: m.VisaComparisonModal })));
const XmlSitemapModal = lazy(() => import('./components/XmlSitemapModal').then(m => ({ default: m.XmlSitemapModal })));
const ServiceDetailPageModal = lazy(() => import('./components/ServiceDetailPageModal').then(m => ({ default: m.ServiceDetailPageModal })));

export default function App() {
  // Initialize state based on current URL path
  const initialRoute = parsePath(window.location.pathname);
  const [currentView, setCurrentViewState] = useState<ViewType>(initialRoute.view);
  const [selectedCountryId, setSelectedCountryIdState] = useState<string>(initialRoute.countryId || 'canada');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | undefined>(initialRoute.blogSlug);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(initialRoute.hotelId || null);
  const [selectedTourId, setSelectedTourId] = useState<string | undefined>(initialRoute.tourId);
  const [selectedUmrahId, setSelectedUmrahId] = useState<string | undefined>(initialRoute.umrahId);
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | undefined>(initialRoute.citySlug);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceDetailItem | null>(null);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingServiceType, setBookingServiceType] = useState<string | undefined>(undefined);

  const [showSitemapModal, setShowSitemapModal] = useState(false);
  const [showAiPlannerModal, setShowAiPlannerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const getCurrentLang = (): 'bn' | 'en' => {
    const route = parsePath(window.location.pathname);
    if (route.lang) return route.lang;
    return getSavedLanguagePreference() || 'bn';
  };

  // Helper for setting view and updating URL bar
  const setCurrentView = (view: ViewType, countryId?: string) => {
    const cid = countryId || selectedCountryId;
    setCurrentViewState(view);
    if (countryId) {
      setSelectedCountryIdState(countryId);
    }
    const path = formatPath(view, cid, getCurrentLang());
    navigateToPath(path);
  };

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryIdState(countryId);
    setCurrentViewState('country-detail');
    const path = formatPath('country-detail', countryId, getCurrentLang());
    navigateToPath(path);
  };

  // Sync back/forward browser button navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parsePath(window.location.pathname);
      setCurrentViewState(route.view);
      if (route.countryId) setSelectedCountryIdState(route.countryId);
      if (route.blogSlug) setSelectedBlogSlug(route.blogSlug);
      if (route.hotelId) setSelectedHotelId(route.hotelId);
      if (route.tourId) setSelectedTourId(route.tourId);
      if (route.umrahId) setSelectedUmrahId(route.umrahId);
      if (route.citySlug) setSelectedCitySlug(route.citySlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedCountryId]);

  const handleOpenBookingModal = (serviceType?: string) => {
    setBookingServiceType(serviceType);
    setShowBookingModal(true);
  };

  const activeCountry = COUNTRIES.find((c) => c.id === selectedCountryId) || COUNTRIES[0];

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between selection:bg-red-600 selection:text-white">
        <SeoHeadManager
          currentView={currentView}
          selectedCountryId={selectedCountryId}
          selectedBlogSlug={selectedBlogSlug}
          selectedHotelId={selectedHotelId}
          selectedTourId={selectedTourId}
          selectedUmrahId={selectedUmrahId}
          selectedCitySlug={selectedCitySlug}
        />

      {/* Header Area */}
      <div>
        <TopBar
          currency={currency}
          onCurrencyChange={(c) => setCurrency(c)}
          onSelectView={(v) => setCurrentView(v)}
        />
        <Navbar
          currentView={currentView}
          onSelectView={(v) => setCurrentView(v)}
          onSelectCountry={handleSelectCountry}
          onOpenBookingModal={handleOpenBookingModal}
        />
      </div>

      {/* Main Body View Switching */}
      <main className="flex-1 pb-16">
        <Suspense fallback={
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
        {currentView === 'home' && (
          <HomeView
            currency={currency}
            onSelectView={(v) => setCurrentView(v)}
            onSelectCountry={handleSelectCountry}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenAiPlanner={() => setShowAiPlannerModal(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView onOpenBookingModal={handleOpenBookingModal} />
        )}

        {currentView === 'services' && (
          <ServicesView
            currency={currency}
            onSelectCountry={handleSelectCountry}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenUploadModal={() => setShowUploadModal(true)}
            onOpenChecklistModal={() => setShowChecklistModal(true)}
            onOpenComparisonModal={() => setShowComparisonModal(true)}
            onSelectView={(v) => setCurrentView(v)}
          />
        )}

        {currentView === 'visa' && (
          <ServicesView
            currency={currency}
            onSelectCountry={handleSelectCountry}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenUploadModal={() => setShowUploadModal(true)}
            onOpenChecklistModal={() => setShowChecklistModal(true)}
            onOpenComparisonModal={() => setShowComparisonModal(true)}
            onSelectView={(v) => setCurrentView(v)}
          />
        )}

        {currentView === 'countries' && (
          <CountriesView
            currency={currency}
            onSelectCountry={handleSelectCountry}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'country-detail' && (
          <CountryDetailPage
            country={activeCountry}
            currency={currency}
            onBack={() => setCurrentView('countries')}
            onOpenBookingModal={handleOpenBookingModal}
            onSelectCountry={handleSelectCountry}
          />
        )}

        {currentView === 'work-permit' && (
          <WorkPermitsView onOpenBookingModal={handleOpenBookingModal} />
        )}

        {(currentView === 'umrah-hajj' || currentView === 'umrah-detail') && (
          <UmrahView currency={currency} onOpenBookingModal={handleOpenBookingModal} initialUmrahId={selectedUmrahId} />
        )}

        {currentView === 'air-tickets' && (
          <AirTicketingView currency={currency} onOpenBookingModal={handleOpenBookingModal} />
        )}

        {(currentView === 'tours' || currentView === 'tour-detail') && (
          <ToursView currency={currency} onOpenBookingModal={handleOpenBookingModal} initialTourId={selectedTourId} />
        )}

        {(currentView === 'hotel' || currentView === 'hotel-detail') && (
          <HotelBookingView
            currency={currency}
            onOpenBookingModal={handleOpenBookingModal}
            initialHotelId={selectedHotelId}
            initialCitySlug={selectedCitySlug}
          />
        )}

        {currentView === 'ai-planner' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center my-6">
              <button
                onClick={() => setShowAiPlannerModal(true)}
                className="px-8 py-4 bg-[#DC2626] text-white font-black rounded-2xl text-sm uppercase shadow-xl cursor-pointer hover:bg-[#B71C1C] transition-colors"
              >
                এআই ট্রাভেল প্ল্যানার চালু করুন
              </button>
            </div>
            <HomeView
              currency={currency}
              onSelectView={(v) => setCurrentView(v)}
              onSelectCountry={handleSelectCountry}
              onOpenBookingModal={handleOpenBookingModal}
              onOpenAiPlanner={() => setShowAiPlannerModal(true)}
            />
          </div>
        )}

        {currentView === 'eligibility' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <VisaEligibilityChecker onOpenBookingModal={handleOpenBookingModal} />
          </div>
        )}

        {currentView === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <VisaCostCalculator currency={currency} onOpenBookingModal={handleOpenBookingModal} />
          </div>
        )}

        {currentView === 'tracker' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ApplicationTracker />
          </div>
        )}

        {currentView === 'checklist' && (
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <button
              onClick={() => setShowChecklistModal(true)}
              className="px-8 py-4 bg-[#DC2626] text-white font-black rounded-2xl text-sm uppercase shadow-xl cursor-pointer hover:bg-[#B71C1C] transition-colors"
            >
              ইন্টারেক্টিভ ট্রাভেল চেকলিস্ট খুলুন
            </button>
          </div>
        )}

        {currentView === 'comparison' && (
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-8 py-4 bg-[#DC2626] text-white font-black rounded-2xl text-sm uppercase shadow-xl cursor-pointer hover:bg-[#B71C1C] transition-colors"
            >
              ভিসা তুলনা ম্যাট্রিক্স খুলুন
            </button>
          </div>
        )}

        {(currentView === 'blog' || currentView === 'blog-detail') && (
          <BlogView initialBlogSlug={selectedBlogSlug} onOpenBookingModal={handleOpenBookingModal} />
        )}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'sitemap' && (
          <SitemapView
            onSelectView={(v) => setCurrentView(v)}
            onSelectCountry={handleSelectCountry}
          />
        )}

        {currentView === 'dashboard' && (
          <CustomerDashboard
            onOpenUploadPortal={() => setShowUploadModal(true)}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentView === 'privacy' && (
          <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700 space-y-4 text-xs">
            <h1 className="text-2xl font-bold text-gray-900 font-sans">গোপনীয়তা নীতি ও ব্যবহারের শর্তাবলী</h1>
            <p>
              ড্রিমস ফ্লাই ইন্টারন্যাশনাল আপনার তথ্যের নিরাপত্তা রক্ষায় প্রতিশ্রুতিবদ্ধ। ভিসা প্রসেসিং এর জন্য গৃহিত সকল আবেদনপত্র, ব্যক্তিগত তথ্য ও ডকুমেন্টস আমাদের নিরাপদ সার্ভারে সংরক্ষিত থাকে এবং শুধুমাত্র সংশ্লিষ্ট এম্বাসি ফাইলে ব্যবহারের জন্য ব্যবহৃত হয়।
            </p>
          </div>
        )}
        </Suspense>
      </main>

      {/* Floating Action Buttons */}
      <FloatingContactWidgets onOpenBookingModal={handleOpenBookingModal} />

      {/* Footer */}
      <Footer
        onSelectView={(v) => setCurrentView(v)}
        onSelectCountry={handleSelectCountry}
        onOpenSitemapModal={() => setShowSitemapModal(true)}
      />

      {/* Modals */}
      <Suspense fallback={null}>
      {showSitemapModal && (
        <XmlSitemapModal
          onClose={() => setShowSitemapModal(false)}
          onSelectView={(v) => setCurrentView(v)}
          onSelectCountry={handleSelectCountry}
          onSelectCityHotel={(citySlug) => {
            setSelectedCitySlug(citySlug);
            setSelectedHotelId(null);
            setCurrentView('hotel');
          }}
          onSelectHotelDetail={(hotelId) => {
            setSelectedHotelId(hotelId);
            setCurrentView('hotel');
          }}
        />
      )}

      {selectedServiceModal && (
        <ServiceDetailPageModal
          service={selectedServiceModal}
          currency={currency}
          onClose={() => setSelectedServiceModal(null)}
          onOpenBookingModal={handleOpenBookingModal}
        />
      )}

      {showBookingModal && (
        <BookingInquiryModal
          initialServiceType={bookingServiceType}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {showAiPlannerModal && (
        <AiTravelPlannerModal
          onClose={() => setShowAiPlannerModal(false)}
          onOpenBookingModal={handleOpenBookingModal}
        />
      )}

      {showUploadModal && (
        <DocumentUploadPortalModal onClose={() => setShowUploadModal(false)} />
      )}

      {showChecklistModal && (
        <TravelChecklistModal onClose={() => setShowChecklistModal(false)} />
      )}

      {showComparisonModal && (
        <VisaComparisonModal
          onClose={() => setShowComparisonModal(false)}
          onOpenBookingModal={handleOpenBookingModal}
        />
      )}
      </Suspense>
      </div>
    </LanguageProvider>
  );
}
