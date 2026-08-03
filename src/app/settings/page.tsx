'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, ShieldCheck, Globe, Bell, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-primary" /> College Settings & MFA Policy
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            General college configuration, timezone defaults, authentication MFA policies, and notification rules.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white text-xs">Save Settings</Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-primary" /> Authentication & Mandatory MFA Settings
            </CardTitle>
            <CardDescription>Security policies enforced for administrative and teaching roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-700">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-900">Mandatory Administrative MFA</p>
                <p className="text-slate-500">Require TOTP Authenticator app for Super Admins, College Owners & Admins.</p>
              </div>
              <Badge variant="success">Enforced</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-900">Learner Password & Session Timeout</p>
                <p className="text-slate-500">Rotate sessions after password changes; automatic log out after 30 mins inactivity.</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
