'use client';

import React, { useState } from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { getReadableTextColor } from '@/lib/tenant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Upload,
  Image as ImageIcon,
  FileText,
  Shield,
  Eye,
  Save,
  Check,
  Building,
  Sparkles
} from 'lucide-react';

export default function BrandingPage() {
  const { branding, tenantName, setBranding, setTenantName } = useTenant();

  // Branding Studio Form State
  const [collegeTitle, setCollegeTitle] = useState(tenantName);
  const [logoUrl, setLogoUrl] = useState(branding.logo_url || 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80');
  const [loginBgUrl, setLoginBgUrl] = useState(branding.login_bg_url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80');
  const [welcomeMessage, setWelcomeMessage] = useState(branding.welcome_message || `Welcome to ${tenantName}`);
  const [introduction, setIntroduction] = useState(branding.introduction || 'Dedicated to academic excellence, innovative learning, and student success.');
  const [privacyPolicy, setPrivacyPolicy] = useState(branding.privacy_policy || 'This institution complies with data protection standards to safeguard student and faculty records.');
  const [termsOfUse, setTermsOfUse] = useState(branding.terms_of_use || 'Students and faculty members are expected to maintain the highest standards of academic integrity.');

  const [primaryColor, setPrimaryColor] = useState(branding.primary_color || '#2563EB');
  const [secondaryColor, setSecondaryColor] = useState(branding.secondary_color || '#0F766E');
  const [accentColor, setAccentColor] = useState(branding.accent_color || '#F59E0B');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const primaryForeground = getReadableTextColor(primaryColor);
  const secondaryForeground = getReadableTextColor(secondaryColor);

  // File Upload Handlers (Simulated File Reader)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setLogoUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setLoginBgUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAllBranding = () => {
    setTenantName(collegeTitle);
    const abbr = collegeTitle.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();

    setBranding({
      ...branding,
      logo_url: logoUrl,
      login_bg_url: loginBgUrl,
      welcome_message: welcomeMessage,
      introduction: introduction,
      privacy_policy: privacyPolicy,
      terms_of_use: termsOfUse,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      accent_color: accentColor,
      college_abbreviation: abbr,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="outline" className="mb-1 text-primary border-primary/30">Standalone LMS Studio</Badge>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Palette className="w-6 h-6 mr-2 text-primary" /> College Customization & Branding Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload your college logo, login background imagery, welcome intro, privacy policy, and brand theme colors.
          </p>
        </div>
        <Button onClick={handleSaveAllBranding} className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2 font-bold px-5">
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Branding Saved & Applied!' : 'Save & Publish Branding'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Controls (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Logo & Visual Assets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" /> 1. Upload College Logo & Graphics
              </CardTitle>
              <CardDescription>Upload your institution's official logo and login background images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  College Logo (PNG, SVG, or JPEG)
                </label>
                <div className="flex items-center space-x-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  {logoUrl ? (
                    <img src={logoUrl} alt="College Logo" className="w-16 h-16 object-contain rounded-lg border bg-white p-1 shadow-xs" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                      <Building className="w-8 h-8" />
                    </div>
                  )}
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400">Recommended: High-resolution PNG with transparent background</p>
                  </div>
                </div>
              </div>

              {/* Login Background Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Login Page & Hero Background Image
                </label>
                <div className="space-y-2">
                  <div className="h-28 w-full rounded-xl overflow-hidden border border-slate-200 relative shadow-inner">
                    <img src={loginBgUrl} alt="Login Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                      <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                        Current Background Banner
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBgUpload}
                    className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: College Identity & Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" /> 2. College Introduction & Content
              </CardTitle>
              <CardDescription>Configure college display title, welcome banner text, and introduction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Official College Name
                </label>
                <input
                  type="text"
                  value={collegeTitle}
                  onChange={(e) => setCollegeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Dashboard Welcome Heading
                </label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  College Introduction Statement
                </label>
                <textarea
                  rows={3}
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" /> 3. Institutional Policies & Terms
              </CardTitle>
              <CardDescription>Custom college data privacy policy and academic terms of use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  College Privacy Policy Statement
                </label>
                <textarea
                  rows={2}
                  value={privacyPolicy}
                  onChange={(e) => setPrivacyPolicy(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Terms of Use & Academic Integrity Code
                </label>
                <textarea
                  rows={2}
                  value={termsOfUse}
                  onChange={(e) => setTermsOfUse(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Palette className="w-5 h-5 mr-2 text-primary" /> 4. Custom Theme Colors & Contrast Validator
              </CardTitle>
              <CardDescription>Select primary, secondary, and accent brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-28 px-3 py-1.5 text-sm font-mono border border-slate-200 rounded-md focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Secondary Brand Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-28 px-3 py-1.5 text-sm font-mono border border-slate-200 rounded-md focus:outline-none uppercase"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Column (1 Col) */}
        <div className="space-y-6">
          <Card className="sticky top-20 shadow-lg border-2 border-primary/20">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-sm flex items-center text-slate-800">
                <Eye className="w-4 h-4 mr-2 text-primary" /> Live Standalone Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Standalone LMS Sidebar / Header Mockup */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                <div className="p-3 text-white flex items-center space-x-3" style={{ backgroundColor: primaryColor }}>
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded bg-white p-0.5" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold text-xs">
                      {collegeTitle.substring(0, 2)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold truncate max-w-[150px]">{collegeTitle}</h4>
                    <p className="text-[10px] text-white/80">Standalone Learning Portal</p>
                  </div>
                </div>

                {/* Hero Banner Preview */}
                <div className="h-24 relative overflow-hidden flex items-end p-3">
                  <img src={loginBgUrl} alt="Bg" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
                  <div className="relative z-10 text-white">
                    <p className="text-[11px] font-bold line-clamp-1">{welcomeMessage}</p>
                    <p className="text-[9px] text-slate-200 line-clamp-1">{introduction}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 space-y-2">
                  <Button className="w-full h-7 text-xs font-bold text-white shadow-2xs" style={{ backgroundColor: secondaryColor }}>
                    Interactive Component
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
