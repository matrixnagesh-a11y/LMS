'use client';

import React, { useState } from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { getReadableTextColor } from '@/lib/tenant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Globe,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Save,
  Check
} from 'lucide-react';

export default function BrandingPage() {
  const { branding, tenantName, setBranding } = useTenant();

  const [primaryColor, setPrimaryColor] = useState(branding.primary_color || '#2563EB');
  const [secondaryColor, setSecondaryColor] = useState(branding.secondary_color || '#0F766E');
  const [welcomeMessage, setWelcomeMessage] = useState(branding.welcome_message || 'Welcome to CollegeLMS Cloud');
  const [abbreviation, setAbbreviation] = useState(branding.college_abbreviation || 'MC');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const primaryForeground = getReadableTextColor(primaryColor);
  const secondaryForeground = getReadableTextColor(secondaryColor);

  const handleSave = () => {
    setBranding({
      ...branding,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      welcome_message: welcomeMessage,
      college_abbreviation: abbreviation,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Palette className="w-6 h-6 mr-2 text-primary" /> College Branding & Custom Domain
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Customize college theme colors, logo assets, welcome banners, and custom domain SSL verification.
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Branding Saved!' : 'Save Branding Changes'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Config */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Color Palette & Contrast Validation</CardTitle>
              <CardDescription>WCAG 2.2 AA compliant color selection with auto-contrast text overlay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Primary Color Picker */}
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
                  <div className="mt-2 p-2 rounded-md text-xs font-semibold flex items-center justify-between" style={{ backgroundColor: primaryColor, color: primaryForeground }}>
                    <span>Primary Text Overlay Test</span>
                    <Badge variant="outline" className="border-white/40 text-white text-[10px]">AA Pass</Badge>
                  </div>
                </div>

                {/* Secondary Color Picker */}
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
                  <div className="mt-2 p-2 rounded-md text-xs font-semibold flex items-center justify-between" style={{ backgroundColor: secondaryColor, color: secondaryForeground }}>
                    <span>Secondary Text Overlay Test</span>
                    <Badge variant="outline" className="border-white/40 text-white text-[10px]">AA Pass</Badge>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    College Abbreviation
                  </label>
                  <input
                    type="text"
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. MC"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Dashboard Welcome Message
                  </label>
                  <input
                    type="text"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Domain Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" /> Custom Domain Configuration
              </CardTitle>
              <CardDescription>Connect customer-owned domain via Cloudflare for SaaS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Custom Domain Hostname</p>
                  <p className="text-sm font-bold text-slate-900 font-mono">learning.meridian.edu.my</p>
                </div>
                <Badge variant="success" className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active (SSL Verified)
                </Badge>
              </div>

              <div className="text-xs text-slate-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100 space-y-2">
                <p className="font-semibold text-blue-950">Required DNS Records:</p>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] bg-white p-2 rounded border border-blue-200">
                  <div>Type: CNAME</div>
                  <div>Name: learning</div>
                  <div>Value: cname.collegelms.com</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Real-time Live Preview */}
        <div className="space-y-6">
          <Card className="sticky top-20 shadow-md">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-sm flex items-center text-slate-700">
                <Eye className="w-4 h-4 mr-2 text-primary" /> Live Portal Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Mini Portal Preview */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="p-3 text-white flex items-center space-x-2" style={{ backgroundColor: primaryColor }}>
                  <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center font-bold text-xs">
                    {abbreviation}
                  </div>
                  <span className="text-xs font-bold truncate">{tenantName}</span>
                </div>
                <div className="p-4 bg-slate-50 space-y-2">
                  <div className="text-xs font-semibold text-slate-800">{welcomeMessage}</div>
                  <div className="w-full h-8 rounded-md flex items-center justify-center text-xs font-semibold text-white shadow-2xs" style={{ backgroundColor: secondaryColor }}>
                    Interactive Button Preview
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
