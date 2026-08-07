'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Cpu,
  BookOpen,
  FileText,
  ArrowRight,
  ShieldCheck,
  Zap,
  Radio,
  Download,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-blue-600">Products</span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge className="bg-blue-600 text-white px-3 py-1 text-xs uppercase tracking-wider">
          www.matrix-iot.com/products
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Matrix-IoT Product Ecosystem
        </h1>
        <p className="text-base text-slate-600">
          Explore our suite of hardware-to-cloud products, smart campus RFID attendance systems, automated lab test benches, and multi-tenant Cloud LMS integrations.
        </p>
      </div>

      {/* Featured Main Product Card: Matrix-IoT Edge & Cloud Platform */}
      <Card className="border-2 border-blue-600 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="p-8 md:p-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline" className="border-blue-400 text-blue-300 bg-blue-500/10 px-3 py-1 text-xs">
              FLAGSHIP PRODUCT • www.matrix-iot.com/products/matrix-iot
            </Badge>
            <span className="text-xs font-mono text-emerald-400 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
              v3.4 Production Ready
            </span>
          </div>

          <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Matrix-IoT Hardware & Cloud Platform
          </CardTitle>

          <CardDescription className="text-slate-300 text-base max-w-3xl leading-relaxed">
            The complete hardware edge gateway, MicroPython firmware SDK, and cloud synchronization engine connecting physical microcontrollers (ESP32/RPi/STM32) directly to Matrix LMS Cloud.
          </CardDescription>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/products/matrix-iot">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-6 py-2.5 font-bold shadow-lg">
                Explore Product Page <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/matrix-iot/brochure">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                <FileText className="w-4 h-4 mr-1.5 text-blue-300" /> View Official Brochure
              </Button>
            </Link>
            <Link href="/matrix-iot/tutorial">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                <BookOpen className="w-4 h-4 mr-1.5 text-purple-300" /> Start Integration Tutorial
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* Product Suite Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Complete Product Lineup</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product 1 */}
          <Card className="hover:border-blue-500 transition-all border border-slate-200">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Smart RFID Campus Gateways</CardTitle>
              <CardDescription className="text-xs">
                Turnkey RFID NFC card readers with PN532 modules and ESP32 microcontrollers for automated lab & classroom attendance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Millisecond-level attendance check-in</li>
                <li>• Anti-passback & security badge validation</li>
                <li>• EEPROM failover buffer up to 10,000 scans</li>
              </ul>
              <Link href="/products/matrix-iot" className="block pt-2">
                <Button variant="outline" className="w-full text-xs text-blue-600 border-blue-200 hover:bg-blue-50">
                  Product Details <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Product 2 */}
          <Card className="hover:border-purple-500 transition-all border border-slate-200">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Automated Test Bench Assessor</CardTitle>
              <CardDescription className="text-xs">
                Hardware-based grading kit for engineering labs that evaluates student code on physical microcontrollers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Logic analyzer & voltage probe integration</li>
                <li>• Real-time feedback to student dashboards</li>
                <li>• Automatic grade sync to Matrix LMS Gradebook</li>
              </ul>
              <Link href="/matrix-iot/tutorial" className="block pt-2">
                <Button variant="outline" className="w-full text-xs text-purple-600 border-purple-200 hover:bg-purple-50">
                  Integration Tutorial <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Product 3 */}
          <Card className="hover:border-emerald-500 transition-all border border-slate-200">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Matrix Cloud LMS Integration</CardTitle>
              <CardDescription className="text-xs">
                Multi-college SaaS LMS with Supabase Row Level Security powering custom branding, course management, and IoT telemetry.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>• Row Level Security tenant data isolation</li>
                <li>• Custom subdomains & SSL certificate setup</li>
                <li>• Real-time analytics & certificate issuance</li>
              </ul>
              <Link href="/matrix-iot/brochure" className="block pt-2">
                <Button variant="outline" className="w-full text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                  Download Brochure <Download className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
