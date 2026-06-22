import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashHeader from '../components/dashboard/DashHeader'
import DashNav from '../components/dashboard/DashNav'
import WelcomeSection from '../components/dashboard/WelcomeSection'
import AnnouncementsTicker from '../components/dashboard/AnnouncementsTicker'
import StatsGrid from '../components/dashboard/StatsGrid'
import FeaturesSection from '../components/dashboard/FeaturesSection'
import ServicesSection from '../components/dashboard/ServicesSection'
import RegistrationForm from '../components/dashboard/RegistrationForm'
import ModulesTable from '../components/dashboard/ModulesTable'
import ContactSection from '../components/dashboard/ContactSection'
import DashFooter from '../components/dashboard/DashFooter'
import ImageSlider from '../components/dashboard/ImageSlider'
import ScrollToTop from '../components/dashboard/ScrollToTop'

export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Refs for smooth scroll target navigation
  const dashboardRef = useRef(null)
  const servicesRef = useRef(null)
  const reportsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Scroll to component depending on selected sidebar menu
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    
    let targetRef = null
    if (tabId === 'dashboard') targetRef = dashboardRef
    if (tabId === 'services') targetRef = servicesRef
    if (tabId === 'reports') targetRef = reportsRef
    if (tabId === 'about') targetRef = aboutRef
    if (tabId === 'contact') targetRef = contactRef

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (!isAuthenticated) {
    return null // Keep blank while redirecting
  }

  return (
    <div style={{
      background: 'var(--color-onyx, #000000)',
      minHeight: '100vh',
      color: 'var(--text-primary, #ffffff)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header (Section 1) */}
      <DashHeader user={user} />

      {/* Main Layout Area */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar Navigation (Section 2) */}
        <DashNav
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onLogout={handleLogout}
        />

        {/* Scrollable HUD Dashboard Content */}
        <main 
          ref={scrollContainerRef}
          style={{
            flex: 1,
            padding: '40px clamp(20px, 4vw, 60px)',
            height: 'calc(100vh - 81px)',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            boxSizing: 'border-box'
          }}
        >
          {/* Scroll Target: Dashboard */}
          <div ref={dashboardRef} style={{ scrollMarginTop: '20px' }}>
            {/* Image Slider (New) */}
            <ImageSlider />

            {/* Welcome Message, Desc, Vision, Mission (Section 3) */}
            <WelcomeSection />

            {/* Latest Announcements Marquee Ticker (Section 7) */}
            <AnnouncementsTicker />

            {/* Dashboard Telemetry Stats (Section 4) */}
            <StatsGrid />
          </div>

          {/* Registration Form (Section 8) */}
          <RegistrationForm />

          {/* Scroll Target: Services (Section 6) */}
          <div ref={servicesRef} style={{ scrollMarginTop: '20px' }}>
            <ServicesSection />
          </div>

          {/* Scroll Target: Reports / Modules Table (Section 9) */}
          <div ref={reportsRef} style={{ scrollMarginTop: '20px' }}>
            <ModulesTable />
          </div>

          {/* Scroll Target: About / Features Section (Section 5) */}
          <div ref={aboutRef} style={{ scrollMarginTop: '20px' }}>
            <FeaturesSection />
          </div>

          {/* Scroll Target: Contact Info (Section 10) */}
          <div ref={contactRef} style={{ scrollMarginTop: '20px' }}>
            <ContactSection />
          </div>

          {/* Footer (Section 11) */}
          <DashFooter />
        </main>
      </div>
      
      <ScrollToTop scrollContainerRef={scrollContainerRef} />
    </div>
  )
}
