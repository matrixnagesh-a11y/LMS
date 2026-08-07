'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Printer,
  Download,
  ArrowLeft,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  CheckCircle2,
  Server,
  Layers,
  Radio,
  Building2,
  Award
} from 'lucide-react';

export default function MatrixIoTBrochurePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 print:py-0 print:max-w-full">
      {/* Non-printable Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
        <Link href="/matrix-iot">
          <Button variant="ghost" size="sm" className="text-xs text-slate-600">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Matrix-IoT Hub
          </Button>
        </Link>
        <div className="flex space-x-3">
          <Button onClick={handlePrint} size="sm" variant="outline" className="text-xs border-slate-300">
            <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-700" /> Print Window
          </Button>
          <a href="/downloads/matrix-iot-brochure.pdf" download="Matrix-IoT-Brochure.pdf">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF Brochure
            </Button>
          </a>
        </div>
      </div>

      {/* Printable Brochure Document Body */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8 md:p-12 print:border-none print:shadow-none print:p-0 space-y-10">
        {/* Header Hero Section */}
        <div className="text-center space-y-4 border-b border-slate-100 pb-8">
          <Badge className="bg-blue-600 text-white px-3 py-1 text-xs uppercase tracking-wider">
            Official System Brochure & System Specifications
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Matrix-IoT Smart Campus System
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hardware-to-Cloud Education & Lab Automation Platform hosted at <span className="font-semibold text-blue-600">matrix-iot.com</span> and powered by Matrix LMS Cloud.
          </p>
        </div>

        {/* Visual Architecture Diagram (SVG) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">System Data Flow & Topology</h2>
          <div className="bg-slate-950 p-6 md:p-8 rounded-2xl text-white shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
              {/* Step 1 */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mx-auto">1</div>
                <Cpu className="w-6 h-6 text-blue-400 mx-auto" />
                <h3 className="font-bold text-sm text-slate-200">Hardware Edge Node</h3>
                <p className="text-[11px] text-slate-400">ESP32 / Raspberry Pi / PN532 RFID Smart Reader</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex justify-center text-blue-400 font-bold text-xl">➔</div>

              {/* Step 2 */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center mx-auto">2</div>
                <Radio className="w-6 h-6 text-purple-400 mx-auto" />
                <h3 className="font-bold text-sm text-slate-200">MQTT / TLS Gateway</h3>
                <p className="text-[11px] text-slate-400">Low-latency broker with offline EEPROM buffer</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex justify-center text-purple-400 font-bold text-xl">➔</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center mt-4">
              <div className="hidden md:flex justify-center text-emerald-400 font-bold text-xl col-span-2"></div>
              
              {/* Step 3 */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center mx-auto">3</div>
                <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto" />
                <h3 className="font-bold text-sm text-slate-200">Matrix LMS Cloud</h3>
                <p className="text-[11px] text-slate-400">Supabase Row-Level Security & College Isolation</p>
              </div>

              {/* Arrow 3 */}
              <div className="hidden md:flex justify-center text-amber-400 font-bold text-xl">➔</div>

              {/* Step 4 */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center mx-auto">4</div>
                <Award className="w-6 h-6 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-sm text-slate-200">Auto Grade & Sync</h3>
                <p className="text-[11px] text-slate-400">Instant Student Attendance & Lab Grade Update</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">Core Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-200">
              <CardHeader className="pb-2">
                <Zap className="w-5 h-5 text-blue-600 mb-1" />
                <CardTitle className="text-base">Real-Time RFID Attendance</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600">
                Millisecond-level student check-in logging directly into college attendance sheets with anti-passback security.
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader className="pb-2">
                <Cpu className="w-5 h-5 text-purple-600 mb-1" />
                <CardTitle className="text-base">Automated Lab Bench Grading</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600">
                Microcontroller test benches evaluate student code uploads physically and submit scores to Matrix LMS Gradebook.
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader className="pb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <CardTitle className="text-base">Multi-Tenant Tenant Isolation</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600">
                Strict data segregation across independent campuses via Supabase PostgreSQL Row Level Security policies.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications Matrix Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">Technical Specifications Matrix</h2>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                <tr>
                  <th className="p-3 border-b">Feature Category</th>
                  <th className="p-3 border-b">Specification & Capabilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Supported Hardware</td>
                  <td className="p-3">ESP32 Dual-Core, Raspberry Pi 4/5, STM32, Arduino Mega, PN532 RFID</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Networking Protocols</td>
                  <td className="p-3">MQTT v5 over TLS 1.3, HTTPS REST APIs, WebSockets streaming</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Sync Performance</td>
                  <td className="p-3">&lt;120ms latency across global edge points with EEPROM failover buffer</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Firmware SDKs</td>
                  <td className="p-3">MicroPython, C++ (Arduino Core), Node.js Gateway SDK</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Cloud Integration</td>
                  <td className="p-3">Matrix Cloud LMS, Supabase Auth, Webhooks, Custom Domain Hosting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real World Deployment Case Studies */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">Deployment Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Meridian College Engineering Faculty</h3>
              </div>
              <p className="text-xs text-slate-600">
                Deployed 24 Matrix-IoT ESP32 RFID stations across 6 electronics laboratories. Reduced manual attendance taking by 100% and automated student lab report submissions.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Horizon Training Institute IoT Labs</h3>
              </div>
              <p className="text-xs text-slate-600">
                Connected 120 student kit test benches streaming telemetry over MQTT to Matrix LMS. Instructors receive real-time alerts when hardware errors occur during exams.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="text-center text-xs text-slate-500 pt-6 border-t border-slate-100">
          <p>© 2026 Matrix-IoT Systems • Hosted at <span className="font-semibold text-slate-700">matrix-iot.com</span> • Multi-College Cloud LMS Integration</p>
        </div>
      </div>
    </div>
  );
}
